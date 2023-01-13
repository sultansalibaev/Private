import pymysql
from settings import Settings


class DataBase:
	def __init__(self, db):
		if db == 'front':
			db_info = Settings.FRONT_DB_INFO
		else:
			return
		try:
			self.con = pymysql.connect(host=db_info['host'],
										user=db_info['user'],
										passwd=db_info['password'],
										db=db_info['db'],
										cursorclass=pymysql.cursors.DictCursor)
		except pymysql.err.OperationalError as e:
			print(e)

	def query_get(self, query, params=()):
		with self.con.cursor() as cur:
			cur.execute(query, params)
			result = cur.fetchall()

		return result

	def query_send(self, query, params=()):
		try:
			with self.con.cursor() as cur:
				cur.execute(query, params)
				self.con.commit()
		finally:
			self.con.close()


def check_link(link):
	query = f"SELECT * FROM items WHERE link = %s"
	rows = DataBase('front').query_get(query, (link,))

	if len(rows) == 0:
		return False
	else:
		return True


def like_link(url):
	query = f"SELECT RESOURCE_ID, RESOURCE_URL FROM resource WHERE RESOURCE_URL LIKE %s"
	rows = DataBase('front').query_get(query, ('%' + url + '%',))

	return rows


def load_categories():
	_list = []
	query = "SELECT * FROM res_categories"
	rows = DataBase('front').query_get(query)

	for row in rows:
		_list.append((row['id_cat'], row['name_cat']))

	_list.insert(0, ('-1', "Не выбрано"))

	return _list


def load_countries():
	_list = []
	query = "SELECT * FROM countries ORDER BY country_name"
	rows = DataBase('front').query_get(query)

	for row in rows:
		if row['id'] == 57 or row['id'] == 40:
			_list.insert(0, (row['id'], row['country_name']))
		else:
			_list.append((row['id'], row['country_name']))

	_list.insert(0, (0, "Не выбрано"))

	return _list


def load_regions():
	_list = []
	query = "SELECT * FROM regions ORDER BY name"
	rows = DataBase('front').query_get(query)

	for row in rows:
		_list.append((row['id'], row['name']))

	_list.insert(0, ('-1', "Не выбрано"))

	return _list


def load_cities():
	_list = []
	query = "SELECT * FROM cities"
	rows = DataBase('front').query_get(query)

	for row in rows:
		_list.append((str(row['id']) + "!" + str(row['region_id']), row['name']))

	_list.insert(0, ('-1', "Не выбрано"))

	return _list


def split_link(link):
	res = []

	if link[len(link) - 1] == '/':
		link = link[:-1]

	try:
		res.append(link.split("://")[0] + "://")
		next_part = link.split("://")[1]
	except IndexError:
		res.append(None)
		next_part = link

	res.append(next_part.split("/")[0].replace("www.", ""))

	return res
