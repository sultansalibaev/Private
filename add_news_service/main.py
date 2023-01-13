import flask as fl
import requests
import flask_wtf as wtf
from flask_wtf import FlaskForm
import wtforms
import wtforms.validators as wtf_val
import time
import datetime
import json
from functions import *


def insert_news(res_id, link, title, content, n_date):
    log_id = "0"
    nd_date = n_date.timestamp()
    s_date = time.time()
    not_date = n_date.date()
    params = (log_id, res_id, link, title, content, n_date, nd_date, s_date, not_date,)

    query = f"INSERT INTO items (`log_id`, `res_id`, `link`, `title`, `content`, `n_date`, " \
            "`nd_date`, `s_date`, `not_date`) VALUES (%s, %s, %s, %s, %s," \
            " %s, %s, %s, %s)"

    try:
        DataBase('front').query_send(query, params)
        return True
    except BaseException as e:
        print('[ERROR] ' + str(e))
        return False


def insert_resource(resource_name, resource_url, category_id, country_id, region_id, city_id):
    resource_description = resource_name

    if resource_url[-1] == "/":
        resource_url = resource_url[:-1]

    if country_id == '57':
        city_id = int(city_id.split("!")[0])

    params = (resource_name, resource_description, resource_url, category_id, country_id, region_id, city_id,)
    query = f"INSERT INTO resource (`RESOURCE_DESCRIPTION`, `RESOURCE_NAME`, `RESOURCE_URL`," \
            f" `RESOURCE_STATUS`, `RESOURCE_LOGO`, `RESOURCE_PAGE_URL`, `RSS_URL`, `CATEGORY_ID`, `COUNTRY_ID`, " \
            f"`region_id`, `city_id`, `old_region`, `top_tag`, `middle_tag`, `bottom_tag`, `title_cut`, " \
            f"`date_cut`, `stability`, `LANG`, `issue`, `block_page`, `convert_date`, `average_day`, `add_date`," \
            f" `status`, `relative_id`) VALUES (%s, %s, %s," \
            f" 'WORK', NULL, NULL, '', %s, %s, %s, %s, 0, '', '', '', ''," \
            f" '', 0, '', 0, '', '', 0, '0000-01-01 00:00:00', 'added_by_vlad_service', 0) "

    try:
        DataBase('front').query_send(query, params)
        return True
    except BaseException as e:
        print('[ERROR] ' + str(e))
        return False


class PageCache:
    def __init__(self):
        self.link = None
        self.title = None
        self.content = None
        self.res_id = None
        self.in_base = False
        self.is_loaded = False


class Application(fl.Flask):
    def __init__(self):
        fl.Flask.__init__(self, __name__)

        self.config['SECRET_KEY'] = 'LongAndRandomSecretKey'
        self.csrf = wtf.csrf.CSRFProtect(self)
        self.csrf.init_app(self)
        self.pages = [0, 1]

        self.index_cache = PageCache()
        self.add_resource_cache = PageCache()

        self.def_frame = "<div align=\"center\" style=\"margin-top: 30%;\"> " \
                         "<h1>Окно для предварительного просмотра</h1> </div>"
        self.header = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 7.0;) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Mobile Safari/537.36 (compatible; PetalBot;+https://aspiegel.com/petalbot)"}

        @self.route('/', methods=['post', 'get'])
        def index():
            form = AddNewsForm()
            form.content.render_kw.update({'rows': '8'})

            return fl.render_template("index.html", form=form, frame=self.def_frame)

        @self.route('/add_resource', methods=['post', 'get'])
        def add_resource():
            form = AddResourceForm()

            return fl.render_template("add_resource.html", form=form, frame=self.def_frame)

        @self.route('/load_page', methods=['POST'])
        def load_page():
            def save_cache():
                if _page == 'index':
                    self.index_cache = page_cache
                elif _page == 'add_resource':
                    self.add_resource_cache = page_cache

            link = fl.request.form['link']
            _page = fl.request.form['page']
            page_cache = PageCache()
            title = None

            if _page == 'index' and self.index_cache.link == link:
                return fl.jsonify(res=self.index_cache.content, title=self.index_cache.title,
                                  err_type=-1, err_text="", _list=[])

            if _page == 'add_resource' and self.add_resource_cache.link == link:
                return fl.jsonify(res=self.add_resource_cache.content, title=self.add_resource_cache.title,
                                  err_type=-1, err_text="", _list=[])

            if link == '':
                save_cache()
                return fl.jsonify(res=self.def_frame, title='',
                                  err_type=-1, err_text='', _list=[])

            try:
                res = requests.get(link, headers=self.header, timeout=10).text
                is_loaded = True

                try:
                    s1 = res.split("<title")[1]
                    if s1[0] == '>':
                        title = s1[1:].split("</title>")[0]
                    else:
                        title = s1.split(">")[1].split("</title")[0]
                except BaseException as e:
                    print('[ERROR] ' + str(e))
                    pass

            except requests.exceptions.MissingSchema:
                is_loaded = False
                res = "<div align=\"center\" style=\"margin-top: 30%;\"> <h1>Вы неверно ввели ссылку</h1> </div>"
            except requests.exceptions.ConnectTimeout:
                is_loaded = False
                res = "<div align=\"center\" style=\"margin-top: 30%;\"> <h1>Сервер не отвечает</h1> </div>"
            except BaseException as e:
                print(e)
                is_loaded = False
                res = "<div align=\"center\" style=\"margin-top: 30%;\"> <h1>Ссылка не рабочая</h1> </div>"

            if is_loaded:
                page_cache.link = link
                page_cache.title = title
                page_cache.content = res
                page_cache.is_loaded = is_loaded
                save_cache()

                if _page == 'index':
                    return self.index_link_validate()
                elif _page == 'add_resource':
                    return self.add_resource_link_validate()
            else:
                return fl.jsonify(res=res, title='',
                                  err_type=5, err_text='Проверьте ссылку', _list=[])

        @self.route('/add_news_validate', methods=['POST'])
        def add_news_validate():
            page_cache = self.index_cache
            err_type = -1
            err_text = ""
            res_id = fl.request.form['resid']
            title = fl.request.form['title']
            content = fl.request.form['content']
            n_date = fl.request.form['n_date']

            res_valid = self.index_link_validate(ignored=True)

            er = json.loads(res_valid.data.decode())['err_type']

            if er != -1:
                return res_valid

            if res_id != "-1":
                page_cache.res_id = res_id

            current_time = time.time()
            n_date = datetime.datetime.strptime(n_date, '%Y-%m-%dT%H:%M')
            select_time = n_date.timestamp()

            if not page_cache.is_loaded:
                err_type = 5
                return fl.jsonify(err_type=err_type, err_text='', _list=[])

            if current_time < select_time:
                err_type = 4
                err_text = "Вы не можете указать время, которое ещё не наступило"
                return fl.jsonify(err_type=err_type, err_text=err_text, _list=[])

            result = insert_news(res_id=page_cache.res_id,
                                 link=page_cache.link,
                                 title=title,
                                 content=content,
                                 n_date=n_date)

            return fl.jsonify(err_type=err_type, err_text=err_text, result=result)

        @self.route('/add_resource_validate', methods=['POST'])
        def add_resource_validate():
            page_cache = self.add_resource_cache
            resource_name = fl.request.form['resource_name']
            category = fl.request.form['category']
            country = fl.request.form['country']
            region = "0"
            city = "0"

            if not page_cache.is_loaded:
                return fl.jsonify(res='', title='', err_type=5, err_text='', _list=[], result=False)

            res_valid = self.add_resource_link_validate()
            er = json.loads(res_valid.data.decode())['err_type']

            if er != -1:
                return res_valid

            if country == '57':
                region = fl.request.form['region']
                city = fl.request.form['city']

            result = insert_resource(resource_name=resource_name,
                                     resource_url=page_cache.link,
                                     category_id=category,
                                     country_id=country,
                                     region_id=region,
                                     city_id=city)

            return fl.jsonify(result=result)

    def index_link_validate(self, ignored=False):
        page_cache = self.index_cache
        err_type = -1
        err_text = ""
        _list = []

        if check_link(page_cache.link):
            err_type = 0
            err_text = "Новость, которую вы пытаетесь добавить, уже есть в базе"
            self.index_cache = PageCache()

            return fl.jsonify(res='', title='', err_type=err_type, err_text=err_text, _list=[])

        main_url = split_link(page_cache.link)[1]
        page_cache.in_base = True

        try:
            rows = like_link(main_url)
        except pymysql.err.OperationalError or pymysql.err.InterfaceError:
            err_type = 1
            err_text = "Ошибка подключения к базе данных"
            self.index_cache = PageCache()

            return fl.jsonify(res='', title='', err_type=err_type, err_text=err_text, _list=[])

        if len(rows) > 1 and ignored is False:
            err_type = 2
            urls = [(-1, "Не выбрано")]

            for row in rows:
                if row["RESOURCE_URL"].find(',') > 0:
                    s = (row["RESOURCE_ID"], row["RESOURCE_URL"].split(',')[1])
                else:
                    s = (row["RESOURCE_ID"], row["RESOURCE_URL"])
                urls.append(s)

            _list = urls
            self.index_cache = page_cache

            return fl.jsonify(res=page_cache.content,
                              title=page_cache.title,
                              err_type=err_type,
                              err_text=err_text,
                              _list=_list)

        elif len(rows) == 1:
            page_cache.res_id = rows[0]["RESOURCE_ID"]

        if len(rows) == 0:
            page_cache.in_base = False
            err_type = 3
            s = split_link(page_cache.link)
            _list = [s[0] + s[1]]
            err_text = f"Указанный ресурс ({main_url}) в базе не найден"
            self.index_cache = page_cache

            return fl.jsonify(res=page_cache.content,
                              title=page_cache.title,
                              err_type=err_type,
                              err_text=err_text,
                              _list=_list)

        self.index_cache = page_cache

        return fl.jsonify(res=page_cache.content,
                          title=page_cache.title,
                          err_type=err_type,
                          err_text=err_text,
                          _list=_list)

    def add_resource_link_validate(self):
        page_cache = self.add_resource_cache
        err_type = -1
        err_text = ""

        main_url = split_link(page_cache.link)[1]

        try:
            rows = like_link(main_url)
        except pymysql.err.OperationalError or pymysql.err.InterfaceError:
            err_type = 0
            err_text = "Ошибка подключения к базе данных"
            self.add_resource_cache = PageCache()

            return fl.jsonify(res='', title='', err_type=err_type, err_text=err_text, _list=[])

        if len(rows) > 0:
            err_type = 1
            err_text = "Введенный ресурс уже есть в базе"
            self.add_resource_cache = PageCache()

            return fl.jsonify(res='', title='', err_type=err_type, err_text=err_text, _list=[])
        else:
            page_cache.in_base = False

        self.add_resource_cache = page_cache

        return fl.jsonify(res=page_cache.content, title=page_cache.title, err_type=err_type, err_text=err_text,
                          _list=[])


class AddNewsForm(FlaskForm):
    n_date = wtforms.DateTimeLocalField(format='%Y-%m-%dT%H:%M',
                                        validators=[wtf_val.DataRequired()])

    link = wtforms.StringField(validators=[wtf_val.DataRequired()],
                               render_kw={'placeholder': 'Введите ссылку на новость'})

    resources = wtforms.SelectField(choices=[],
                                    coerce=int,
                                    default=-1,
                                    validate_choice=False)

    title = wtforms.TextAreaField(validators=[wtf_val.DataRequired()],
                                  render_kw={'placeholder': 'Введите заголовок новости', 'rows': '4'})

    content = wtforms.TextAreaField(validators=[wtf_val.DataRequired()],
                                    render_kw={'placeholder': 'Введите контент новости', 'rows': '7'})

    submit = wtforms.SubmitField(label='Добавить',
                                 render_kw={'class': 'add-button'})


class AddResourceForm(FlaskForm):
    list_categories = load_categories()
    list_countries = load_countries()
    list_regions = load_regions()
    list_cities = load_cities()

    link = wtforms.StringField(render_kw={'placeholder': 'Введите ссылку на ресурс'})

    resource_name = wtforms.TextAreaField(render_kw={'placeholder': 'Введите название ресурса', 'rows': '4'})

    category = wtforms.SelectField(choices=list_categories,
                                   validate_choice=False)

    country = wtforms.SelectField(choices=list_countries,
                                  coerce=int,
                                  render_kw={'class': 'js-select2'},
                                  validate_choice=False)

    region = wtforms.SelectField(choices=list_regions,
                                 default=-1,
                                 validate_choice=False)

    city = wtforms.SelectField(choices=list_cities,
                               default=0,
                               validate_choice=False)

    submit = wtforms.SubmitField(label='Добавить',
                                 render_kw={'class': 'add-button'})


if __name__ == "__main__":
    Application().run()
