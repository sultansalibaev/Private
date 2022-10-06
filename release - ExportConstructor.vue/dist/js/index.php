<?php
// cabinet 3 tape
use yii\helpers\Html;
use yii\helpers\Url;

$lang = '/' . Yii::$app->language;
$this->title = $project['name'] . ' | ' . Yii::t('common', 'Лента');
$urlRest = Yii::$app->params['urlRest'];

############ CSS
$this->registerCssFile('/css/adaptive_css/adaptive_style.css', ['depends' => ['frontend\assets\AppAsset']]);	// global adaptive
$this->registerCssFile('/css/view_tape/model-confirmation.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerCssFile('/css/view_tape/tape.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerCssFile('/css/view_tape/filter.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerCssFile('/css/view_news/news.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerCssFile('/css/view_news/news_1.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerCssFile('/myjs_css/css/checkbox/hummingbird-treeview.css', ['depends' => ['frontend\assets\AppAsset']]); // Дерево из checkbox
$this->registerCssFile('css/plugins/daterangepicker/daterangepicker-bs3.css', ['depends' => ['frontend\assets\AppAsset']]); // Календарь
$this->registerCssFile('css/plugins/dualListbox/bootstrap-duallistbox.min.css', ['depends' => ['frontend\assets\AppAsset']]); // Перенос Стран
$this->registerCssFile('css/plugins/sweetalert/sweetalert.css', ['depends' => ['frontend\assets\AppAsset']]); // плагин для подтверждения
$this->registerCssFile('/myjs_css/css/checkbox/hummingbird-treeview.css', ['depends' => ['frontend\assets\AppAsset']]); // Дерево из checkbox

############ JS
$this->registerJsFile('/myjs_css/js/highcharts/highcharts.js', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerJsFile('/myjs_css/js/checkbox/hummingbird-treeview.js', ['depends' => ['frontend\assets\AppAsset']]); // дерево из checkbox
$this->registerJsFile('js/plugins/fullcalendar/moment.min.js', ['depends' => ['frontend\assets\AppAsset']]); // Плагин к Календарю
$this->registerJsFile('js/plugins/daterangepicker/daterangepicker.js', ['depends' => ['frontend\assets\AppAsset']]); // Календарь
$this->registerJsFile('js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', ['depends' => ['frontend\assets\AppAsset']]); // Перенос Стран
$this->registerJsFile('js/plugins/footable/footable.all.min.js', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerJsFile('js/plugins/sweetalert/sweetalert.min.js', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerJsFile('js/myplugins/date.js', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerJsFile('/myjs_css/js/checkbox/hummingbird-treeview.js', ['depends' => ['frontend\assets\AppAsset']]); // дерево из checkbox
?>
<?php $this->registerJsFile('js/view_js/tape/ts/tape.js', ['depends' => ['frontend\assets\AppAsset']]); ?>
<script>
	let _token = '<?= $token ?>';
</script>
<?php $this->registerJsFile('js/view_js/tape/constructor/index.js', ['depends' => ['frontend\assets\AppAsset']]); ?>
<? if ($project['status'] == 'done') { ?>
	<? if ($lang == '/kz') { ?>
		<style>
			.title-daterangepicker h3::before {
				content: "Деректерді жинау кезеңі";
			}

			.title-daterangepicker h3 span {
				display: none;
			}

			.box1 .w-100 h3::before,
			.box2 .w-100 h3::before {
				content: "Елдер (Басылымдар)";
			}

			.box1 .w-100 h3 span,
			.box2 .w-100 h3 span {
				display: none;
			}
		</style>
	<? } else if ($lang == '/en') { ?>
		<style>
			.title-daterangepicker h3::before {
				content: "Choose a period";
			}

			.title-daterangepicker h3 span {
				display: none;
			}

			.box1 .w-100 h3::before,
			.box2 .w-100 h3::before {
				content: "Countries (Publications)";
			}

			.box1 .w-100 h3 span,
			.box2 .w-100 h3 span {
				display: none;
			}
		</style>
	<? } ?>

	<div class="sidebar-content">
		<!-- Фильтр -->
		<div class="sidebar-panel rmax-width-768 p-0">
			<div class="col-xs-12 filter_block p-0 ">
				<div class="col-lg-12 p-t-15">
					<h3><? echo Yii::t('common', 'Фильтр'); ?></h3>
				</div>

				<!-- Фильтр Период -->
				<div class="col-lg-12 filter_datetime p-t-0">
					<div id="reportrange" class="form-control">
						<i class="fa fa-calendar p-r-5"></i>
						<span></span>
					</div>
				</div>

				<!-- Фильтр Страна -->
				<div class="col-lg-12 col-xs-12 filter_country">
					<button class="btn btn-white btn-sm f-l" onclick="show_modal_country();">
						<i class="fa f-l"></i>
						<span class="title_country" title="Весь мир"><? echo Yii::t('common', 'Страна'); ?></span>
					</button>
				</div>


				<!-- Фильтр Язык -->
				<div class="col-lg-12 filter_language p-t-0">
					<div class="btn-group">
						<button data-toggle="dropdown" class="btn btn-white btn-sm dropdown-toggle" aria-expanded="true"><? echo Yii::t('common', 'Язык'); ?></button>
						<ul class="dropdown-menu">
							<?
							$lg_filter_array = explode(',', $lg_filter);
							foreach ($languages as $language) {
								$lg_find = 0;
								if (in_array($language['id'], $lg_filter_array)) {
									$lg_find = 1;
								} ?>
								<li><a href="#"><label><input id="lang_filter_<?= $language['id'] ?>" type="checkbox" class="i-checks" <? if ($lg_find == 1 || $lg_filter == 'all') echo "checked"; ?>> <? echo Yii::t('common', $language['rus_name'] . ' язык'); ?></label></a></li>
							<? } ?>
						</ul>
					</div>
				</div>


				<!-- Фильтр Тональности -->
				<div class="col-lg-12 filter_sentiments p-t-0">
					<!-- Данные imas-ajax -->
				</div>
				<!-- </div> -->

				<!-- <div class="col-xs-12"> -->
				<div class="col-xs-12 p-15 border-bottom">
					<button class="btn btn-primary btn-sm f-l <? if ($lang == '/kz') echo 'w-35';
																else echo 'w-50'; ?>" onclick="filter_page();"><? echo Yii::t('common', 'Применить'); ?></button>
					<button class="btn btn-white btn-sm f-l <? if ($lang == '/kz') echo 'w-60';
															else echo 'w-45'; ?> m-l-5p " onclick="remove_filter_page();"><? echo Yii::t('common', 'Сбросить'); ?></button>
				</div>

				<!-- Экспорт -->
				<!--				<div class="col-xs-12 export p-t-15">-->
				<!--					<button class="btn btn-imas btn-sm f-l" data-toggle="modal" data-target="#modal_export">--><? //echo Yii::t('common', 'Экспорт');
																																	?>
				<!--</button>-->
				<!--				</div>-->

				<?php if (in_array('access_export_with_filters', Yii::$app->session['test_permissions'])) { ?>
					<!-- Экспорт с фильтрами -->
					<div class="col-xs-12 export p-t-15">
						<button class="btn btn-imas btn-sm f-l" data-toggle="modal" data-target="#modal_export_with_filter"><? echo Yii::t('common', 'Экспорт с фильтром'); ?></button>
					</div>
				<?php } ?>
				<?php if (in_array('access_export_server', Yii::$app->session['test_permissions'])) { ?>
					<!-- Экспорт с фильтрами -->
					<div class="col-xs-12 export p-t-15">
						<button class="btn btn-imas btn-sm f-l" data-toggle="modal" data-target="#modal_export_server"><? echo Yii::t('common', 'Экспорт с сервера (тест)'); ?></button>
					</div>
				<?php } ?>

				<!-- Export Constructor -->
				<div class="col-xs-12 export p-t-15">
					<button class="btn btn-imas btn-sm f-l" onclick="ExportConstructor.prototype.launch('pdf', getRequestLang());">
						<? echo Yii::t('common', 'Конструктор Отчётов'); ?>
					</button>
					<!-- onclick="Exportserver.prototype.launchConstructor('pdf');" -->
					<!-- onclick="export_project2('pdf2', 'https:/\/cab-dev-front.imas.kz/ru/export-constructor');" -->
				</div>


				<!-- Экспорт с конструктора -->
				<div class="col-xs-12 export p-t-15">
					<button class="btn btn-imas btn-sm f-l" id="_modal_export_constructor" data-toggle="modal" data-target="#modal_export_constructor">
						<? echo Yii::t('common', 'Экспорт с конструктора'); ?>
					</button>
				</div>


				<!-- Экспорт с конструктора -->
				<div class="col-xs-12 export p-t-15">
					<button class="btn btn-imas btn-sm f-l" id="_modal_standard_constructors" data-toggle="modal" data-target="#modal_standard_constructors">
						<? echo Yii::t('common', 'Стандартные шаблоны'); ?>
					</button>
				</div>



				<!-- Расширенный экспорт -->
				<?/*
				<div class="col-xs-12 export p-t-15 p-b-15">
					<button class="btn btn-imas btn-sm f-l" data-toggle="modal" data-target="#nexport_modal"><?echo Yii::t('common', 'Нэкспорт');?></button>
				</div>
				*/ ?>
			</div>
		</div>

		<div class="wrapper wrapper-content p-0" id="imas-tape">
			<!-- Меню навигации -->
			<div class="row ">
				<div class="col-lg-12 p-0-10 m-t-md">
					<div class="menu_social_navigation">
						<!-- Данные imas-ajax -->
					</div>
				</div>
			</div>

			<!-- Динамика сообщений -->
			<div class="ibox m-t-md">
				<div class="col-lg-12 white-bg p-0">
					<div class="ibox float-e-margins m-b-15">
						<div class="ibox-title no-borders p-15-15-0" style="min-height: inherit;">
							<h3 class="m-0 f-l f-w-500"><? echo Yii::t('common', 'Динамика публикаций'); ?></h3>
						</div>
						<div class="ibox-content no-padding no-borders" style="">
							<div id="modal_dynamics" class="col-lg-12 p-0"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- Новости -->
			<div class="row">
				<div class="col-lg-12 p-0" id="project_news">
					<!-- Данные imas-ajax -->
				</div>
			</div>
		</div>
	</div>

	<input type="hidden" id="hidden_p_id" value="<?= $p_id; ?>">
	<input type="hidden" id="hidden_lg_filter" value="<?= $lg_filter; ?>">
	<input type="hidden" id="hidden_sentiment_id" value="<?
															$sentiment_id = $sentiment;
															if ($sentiment == Yii::t('common', 'позитив')) $sentiment_id = '1';
															if ($sentiment == Yii::t('common', 'негатив')) $sentiment_id = '2';
															if ($sentiment == Yii::t('common', 'нейтрал')) $sentiment_id = '3';
															echo $sentiment_id;
															?>">
	<input type="hidden" id="hidden_sentiment" value="<?= $sentiment; ?>">
	<input type="hidden" id="hidden_s_date" value="<?= $s_date; ?>">
	<input type="hidden" id="hidden_s_time" value="<?= $s_time; ?>">
	<input type="hidden" id="hidden_f_date" value="<?= $f_date; ?>">
	<input type="hidden" id="hidden_f_time" value="<?= $f_time; ?>">
	<input type="hidden" id="hidden_s_date_project" value="<?= $s_date_project; ?>">
	<input type="hidden" id="hidden_f_date_project" value="<?= $f_date_project; ?>">
	<input type="hidden" id="hidden_type_news" value="<?= $type_news; ?>">
	<input type="hidden" id="hidden_res_id" value="<?= $res_id; ?>">
	<input type="hidden" id="hidden_page_number" value="<?= $p; ?>">
	<input type="hidden" id="hidden_page_number" value="<?= $p; ?>">
	<input type="hidden" id="hidden_lang_url" value="<?= $lang; ?>">



	<input type="hidden" id="page_input" value="">
	<input type="hidden" id="news_sentiment" value="<?= $sentiment ?>">
	<input type="hidden" id="news_place" value="<?= $place ?>">
	<input type="hidden" id="news_place_id" value="<?= $place_id ?>">
	<input type="hidden" id="type_news" value="<?= $type_news ?>">
	<input type="hidden" id="vyew_type_news" value="<?= $vyew_type_news ?>">

	<input type="hidden" id="s_date_filter" value="<? echo date("d.m.Y", strtotime($s_date . ' ' . $s_time)) ?>">
	<input type="hidden" id="f_date_filter" value="<? echo date("d.m.Y", strtotime($f_date . ' ' . $f_time)) ?>">

	<input type="hidden" id="place_filter" value="<?= $place ?>">
	<input type="hidden" id="place_id_filter" value="">
	<input type="hidden" id="place_id_filter2" value="<?= $place_id ?>">

	<input type="hidden" id="label_checked_news_id" value="">
	<input type="hidden" id="label_checked_r_type" value="">


	<!-- + Модальное окно дерево из Страны -->
	<div class="modal fade modal-framed" id="modal_country" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0 p-15-25">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите страны'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="modal-body w-100 coutry_filter_dual" id="modal_country_list">
					<!-- Данные imas-ajax -->
					<span class="hint"><? echo Yii::t('common', 'Идет загрузка стран...'); ?></span>
				</div>
				<div class="modal-footer btn_click">
					<button class="btn btn-primary btn-sm f-r m-r" data-dismiss="modal" onclick="save_filter_country();"><? echo Yii::t('common', 'Применить'); ?></button>
					<button class="btn btn-default btn-sm f-r m-r-20" data-dismiss="modal"><? echo Yii::t('common', 'Отмена'); ?></button>
				</div>
			</div>
		</div>
	</div>

	<!-- Модальное окно удаления ресурсов -->
	<div class="modal fade modal-framed" id="modal_delete_resource" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog imas-modal-700" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Удаление источника'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="modal-body w-100 p-10-15-20" id="" style="min-height:110px;">
					<div class="row">
						<input type="hidden" id="delete_resource_r_type" value="">
						<input type="hidden" id="delete_resource_res_id" value="">
						<div class="col-lg-12" id="del_res_info" style="min-height:110px;"></div>
					</div>
				</div>
				<div class="modal-footer btn_click">
					<button class="btn btn-primary f-r" data-dismiss="modal" onclick="delete_resource_confirm('project')"><? echo Yii::t('common', 'Удалить из проекта'); ?></button>
					<button class="btn btn-default f-r m-r-20" data-dismiss="modal" onclick="clear_input_name();"><? echo Yii::t('common', 'Отмена'); ?></button>
					<? // <button class="btn btn-imas btn-sm f-l m-l-20" data-dismiss="modal" onclick="delete_resource_confirm('all')">Из всех проектов</button>
					?>
				</div>
			</div>
		</div>
	</div>

	<!-- Модальное окно Экпорт -->
	<div class="modal fade modal-framed" id="modal_export" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog imas-modal-400" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите вид экспорта'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="modal-body w-100 p-15 btn_click">
					<div class="row m-0">
						<div class="col-lg-12 p-15 block_exports">
							<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i><? echo Yii::t('common', 'WORD таблица'); ?></span>
							<button class="btn btn-primary f-r" onclick="export_project('word_format_2');"><? echo Yii::t('common', 'Экспорт'); ?></button>
						</div>
						<? if (in_array('create_globals', Yii::$app->session['test_permissions'])) { ?>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i><? echo Yii::t('common', 'WORD таблица новый'); ?></span>
								<button class="btn btn-primary f-r" onclick="export_project('word_format_3');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>
						<? } ?>
						<div class="col-lg-12 p-15 block_exports">
							<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD</span>
							<button class="btn btn-primary f-r" onclick="export_project('word');"><? echo Yii::t('common', 'Экспорт'); ?></button>
						</div>
						<div class="col-lg-12 p-15 block_exports">
							<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD 4.1</span>
							<button class="btn btn-primary f-r" onclick="export_project('word4.1');"><? echo Yii::t('common', 'Экспорт'); ?></button>
						</div>
						<? if (in_array('word_press_clipping', Yii::$app->session['test_permissions'])) { ?>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD press clipping</span>
								<button class="btn btn-primary f-r" onclick="export_project('word_press_clipping');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>
						<? } ?>
						<div class="col-lg-12 p-15 block_exports">
							<span class="pdf_tabs"><i class="fa fa-file-pdf f-s-22 p-r-5"></i>PDF</span>
							<button class="btn btn-primary f-r m-l-5" onclick="export_project('pdf2');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							<?/*<button class="btn btn-primary f-r" onclick="export_project('pdf2_kaz');"><?echo Yii::t('common', 'Каз');?></button> */ ?>
						</div>

						<div class="col-lg-12 p-15 block_exports">
							<span class="excel_tabs"><i class="fa fa-file-excel f-s-22 p-r-5"></i>Excel</span>
							<button class="btn btn-primary f-r" onclick="export_project('excel');"><? echo Yii::t('common', 'Экспорт'); ?></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if (in_array('access_export_with_filters', Yii::$app->session['test_permissions'])) { ?>
		<!-- Модальное окно Экпорт с фильтром -->
		<div class="modal fade modal-framed" id="modal_export_with_filter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			<div class="modal-dialog imas-modal-400" role="document">
				<div class="modal-content">
					<div class="modal-header bg-primary b-r-0">
						<div class="col-lg-12 p-0">
							<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите вид экспорта'); ?></h3>
							<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
								<i class="fa fa-close"></i>
							</button>
						</div>
					</div>
					<div class="modal-body w-100 p-15 btn_click">
						<div class="row m-0">
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i> <? echo Yii::t('common', 'WORD таблица'); ?></span>
								<button class="btn btn-primary f-r" onclick="Export.prototype.launch('word_format_2');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i> <? echo Yii::t('common', 'WORD таблица новый'); ?></span>
								<button class="btn btn-primary f-r" onclick="Export.prototype.launch('word_format_3');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD</span>
								<button class="btn btn-primary f-r" onclick="Export.prototype.launch('word');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD 4.1</span>
								<button class="btn btn-primary f-r" onclick="Export.prototype.launch('word4.1');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>

							<div class="col-lg-12 p-15 block_exports">
								<span class="pdf_tabs"><i class="fa fa-file-pdf f-s-22 p-r-5"></i>PDF</span>
								<button class="btn btn-primary f-r m-l-5" onclick="Export.prototype.launch('pdf2');"><? echo Yii::t('common', 'Рус'); ?></button>
								<button class="btn btn-primary f-r" onclick="Export.prototype.launch('pdf2_kaz');"><? echo Yii::t('common', 'Каз'); ?></button>
							</div>

							<div class="col-lg-12 p-15 block_exports">
								<span class="excel_tabs"><i class="fa fa-file-excel f-s-22 p-r-5"></i>Excel</span>
								<button class="btn btn-primary f-r" onclick="Export.prototype.launch('excel');"><? echo Yii::t('common', 'Экспорт'); ?></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php } ?>

	<!-- Модальное окно Экпорт с Конструктора -->

	<div class="model-error__wrapper">
		<div class="model-error__body">
			<div class="model-error__header">
				<h3>Подтверждение</h3>
				<p>Вы уверены что хотите удалить "<span>Конструктор</span>"?</p>
			</div>
			<div class="model-error__footer">
				<button class="model-error__cancel">Назад</button>
				<button class="model-error__remove">Удалить</button>
			</div>
		</div>
	</div>
	<div class="modal fade modal-framed" id="modal_export_constructor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog imas-modal-400" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите вид экспорта'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="modal-body w-100 p-15 btn_click">
					<div class="row m-0" style="overflow-y: scroll;max-height: 600px;overflow-x: hidden;">
						<!-- Сохранённые Конструкторы -->
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- Модальное окно Экпорт с Конструктора -->
	<div class="modal fade modal-framed" id="modal_standard_constructors" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog imas-modal-400" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите вид экспорта'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="modal-body w-100 p-15 btn_click">
					<div class="row m-0" style="overflow-y: scroll;max-height: 600px;overflow-x: hidden;">
						<!-- Стандартные шаблоны -->
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if (in_array('access_export_server', Yii::$app->session['test_permissions'])) { ?>
		<!-- Модальное окно Экпорт с фильтром -->
		<div class="modal fade modal-framed" id="modal_export_server" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			<div class="modal-dialog imas-modal-400" role="document">
				<div class="modal-content">
					<div class="modal-header bg-primary b-r-0">
						<div class="col-lg-12 p-0">
							<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите вид экспорта'); ?></h3>
							<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
								<i class="fa fa-close"></i>
							</button>
						</div>
					</div>
					<div class="modal-body w-100 p-15 btn_click">
						<div class="row m-0">
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i> <? echo Yii::t('common', 'WORD таблица'); ?></span>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_2_eng');"><? echo Yii::t('common', 'EN'); ?></button>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_2');"><? echo Yii::t('common', 'RU'); ?></button>
								<button class="btn btn-primary f-r" onclick="Exportserver.prototype.launch('word_format_2_kaz');"><? echo Yii::t('common', 'KZ'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i> <? echo Yii::t('common', 'WORD таблица новый'); ?></span>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_3_eng');"><? echo Yii::t('common', 'EN'); ?></button>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_3');"><? echo Yii::t('common', 'RU'); ?></button>
								<button class="btn btn-primary f-r" onclick="Exportserver.prototype.launch('word_format_3_kaz');"><? echo Yii::t('common', 'KZ'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD</span>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_1_eng');"><? echo Yii::t('common', 'EN'); ?></button>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_1');"><? echo Yii::t('common', 'RU'); ?></button>
								<button class="btn btn-primary f-r" onclick="Exportserver.prototype.launch('word_format_1_kaz');"><? echo Yii::t('common', 'KZ'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="word_tabs"><i class="fa fa-file-word f-s-22 p-r-5"></i>WORD 4.1</span>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_4_eng');"><? echo Yii::t('common', 'EN'); ?></button>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('word_format_4');"><? echo Yii::t('common', 'RU'); ?></button>
								<button class="btn btn-primary f-r" onclick="Exportserver.prototype.launch('word_format_4_kaz');"><? echo Yii::t('common', 'KZ'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="pdf_tabs"><i class="fa fa-file-pdf f-s-22 p-r-5"></i>PDF</span>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('pdf_eng');"><? echo Yii::t('common', 'EN'); ?></button>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('pdf');"><? echo Yii::t('common', 'RU'); ?></button>
								<button class="btn btn-primary f-r" onclick="Exportserver.prototype.launch('pdf_kaz');"><? echo Yii::t('common', 'KZ'); ?></button>
							</div>
							<div class="col-lg-12 p-15 block_exports">
								<span class="excel_tabs"><i class="fa fa-file-excel f-s-22 p-r-5"></i>Excel</span>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('excel_eng');"><? echo Yii::t('common', 'EN'); ?></button>
								<button class="btn btn-primary f-r m-l-5" onclick="Exportserver.prototype.launch('excel');"><? echo Yii::t('common', 'RU'); ?></button>
								<button class="btn btn-primary f-r" onclick="Exportserver.prototype.launch('excel_kaz');"><? echo Yii::t('common', 'KZ'); ?></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php } ?>

	<!-- Модальное окно настройка экспорта -->
	<div class="modal fade modal-framed modal_add_notification" id="nexport_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog imas-modal-600" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0">
					<div class="col-lg-12 p-0-30">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Расширенный экспорт'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top:0px" onclick="nexport_close_modal()">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>

				<div class="modal-body w-100" id="nexport-modal-body" style="overflow-y:auto;">
					<div class="row">
						<div id="nexport-header">
							<div class="form-group col-md">
								<select onchange="nexport_start(this.value)" id="nexport_type_selector" class="form-control">
									<option onclick="nexport_close_modal()" value="null" selected>Выберите вид экспорта</option>
									<option value="pdf">PDF</option>
									<option value="word">Word</option>
									<option value="word4.1">Word 4.1</option>
									<option value="excel">Excel</option>
								</select>
							</div>
						</div>
						<div id="nexport-body" class="m-t-15">
						</div>
					</div>
				</div>

				<div class="modal-footer btn_click">
					<button id="nexport_dbutton" class="hidden btn btn-primary f-r m-l-20" onclick="nexport_download('pdf');"><? echo Yii::t('common', 'Скачать файл'); ?></button>
					<button class="btn btn-default f-r" data-dismiss="modal" onclick="nexport_close_modal()"><? echo Yii::t('common', 'Отмена'); ?></button>
				</div>
			</div>
		</div>
	</div>

	<!-- Модальное окно одной новости -->
	<div class="modal modal-framed" id="modal_one_news_smi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog modal-lg imas-modal-basic" role="document" id="one_news">
			<!-- Данные imas-ajax -->
		</div>
	</div>

	<!-- Модальное окно добавление в папку -->
	<div class="modal fade modal-framed" id="modal_add_folders" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		<div class="modal-dialog imas-modal-600" role="document">
			<div class="modal-content">
				<div class="modal-header bg-primary b-r-0">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0"><? echo Yii::t('common', 'Выберите избранное'); ?></h3>
						<button class="close btn p-absolute" data-dismiss="modal" onclick="close_modal();" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="modal-body w-100 p-15 p-b-0">
					<div class="row">
						<div id="labels_list"></div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="row">
						<div class="col-lg-12 new_name_labels btn_click">
							<input type="text" id="new_name_labels" name="new_name_labels" class="form-control f-l" placeholder="<? echo Yii::t('common', 'Введите название избранного...'); ?>" maxlength="70">

							<button id="favorites-create-button" class="btn btn-primary f-l" name="add_new_labels" onclick="add_new_labels();"><? echo Yii::t('common', 'Создать'); ?></button>
						</div>
						<div class="col-lg-12 m-t-md tape-label-list-footer rmin-width-672">
							<div><button data-news-info="Hoog rider" onclick="toggle_labellist_vision(this)" id="button-change-label-display" class="btn btn-primary w-100 tape-label-list-footer-checked"><? echo Yii::t('common', 'Показать отмеченные теги'); ?></button></div>
						</div>
						<div id="favorites-cancel-button" class="col-lg-12 m-t-md btn_click">
							<button class="btn btn-default f-r" data-dismiss="modal" onclick="clear_input_name();"><? echo Yii::t('common', 'Отмена'); ?></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<!--  Функция по изменению URL без подгрузки -->
	<script>
		function replace_Query_Param(parametr, new_value, string_Url) {
			var regex = new RegExp("([?;&])" + parametr + "[^&;]*[;&]?");
			var new_string_Url = string_Url.replace(regex, "$1").replace(/&$/, '');
			return (new_string_Url.length > 2 ? new_string_Url + "&" : "?") + (new_value ? parametr + "=" + new_value : '');
		}
	</script>

	<!-- Загрузки библиотек  -->
	<script>
		// Функция для календаря
		function do_daterangepicker_stuff(start, end, label) {
			$('#s_date_filter').val(start.format('D.MM.YYYY'));
			$('#f_date_filter').val(end.format('D.MM.YYYY'));
			$('#reportrange span').html(start.format('D.MM.YYYY') + ' - ' + end.format('D.MM.YYYY'));
		}

		// v_M21
		// Определяет количество margin-top для footer календаря
		function stabilize_daterangepicker() {
			const wide_screen_calendar_buttons = $(".ranges.btn_click ul")[0];
			const buttons_count = wide_screen_calendar_buttons.childElementCount - 1;
			const normal_size = 20;
			if (buttons_count >= 7)
				var margin_to = normal_size;
			else {
				var buffer = 7 - buttons_count;
				var margin_to = buffer * 30 + 20;
			}
			const calendar_bottom = $(".range_inputs")[0];
			calendar_bottom.style.marginTop = `${margin_to}px`
		}

		// Создать календарь
		function create_daterangepicker() {
			// v:004-92M
			const string_date = '<? echo date("d.m.Y", strtotime("{$s_date} {$s_time}")) ?>' + ' - ' + '<? echo date("d.m.Y", strtotime($f_date . ' ' . $f_time)) ?>';
			const daterangepicker_setting = {
				format: 'DD.MM.YYYY',
				startDate: '<? echo date("d.m.Y", strtotime($s_date . ' ' . $s_time)) ?>',
				endDate: '<? echo date("d.m.Y", strtotime($f_date . ' ' . $f_time)) ?>',
				minDate: '<? echo date("d.m.Y", strtotime($s_date_project . ' ' . $s_time)) ?>',
				maxDate: '<? $d = strtotime("+1 day");
							echo date("d.m.Y", $d); ?>',
				showDropdowns: true,
				// showWeekNumbers: true,
				timePicker: false,
				timePickerIncrement: 1,
				timePicker12Hour: true,

				ranges: {
					'<? echo Yii::t('common', 'За весь вериод'); ?>': [moment('<? echo date("m/d/Y", strtotime($s_date_project . ' ' . $s_time)) ?>'), moment('<? echo date("m/d/Y", strtotime($f_date_project . ' ' . $f_time)) ?>')],
					'<? echo Yii::t('common', 'Сегодня'); ?>': [moment(), moment()],
					'<? echo Yii::t('common', 'Вчера'); ?>': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'<? echo Yii::t('common', 'Неделя'); ?>': [moment().subtract(6, 'days'), moment()],
					'<? echo Yii::t('common', '30 дней'); ?>': [moment().subtract(29, 'days'), moment()],
					'<? echo Yii::t('common', 'Текущий месяц'); ?>': [moment().startOf('month'), moment().endOf('month')],
					'<? echo Yii::t('common', 'Прошлый месяц'); ?>': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
				},

				opens: 'right',
				drops: 'down',
				buttonClasses: ['btn', 'btn-sm'],
				applyClass: 'btn-primary daterangepicker-apply-button',
				cancelClass: 'btn-default daterangepicker-cancel-button',
				separator: ' to ',
				locale: {
					applyLabel: '<? echo Yii::t('common', 'Ок'); ?>',
					cancelLabel: '<? echo Yii::t('common', 'Отмена'); ?>',
					fromLabel: '<? echo Yii::t('common', 'от'); ?>',
					toLabel: '<? echo Yii::t('common', 'по'); ?>',
					customRangeLabel: '<? echo Yii::t('common', 'Период'); ?>',
					daysOfWeek: [
						"<? echo Yii::t('common', 'Вс'); ?>",
						"<? echo Yii::t('common', 'Пн'); ?>",
						"<? echo Yii::t('common', 'Вт'); ?>",
						"<? echo Yii::t('common', 'Ср'); ?>",
						"<? echo Yii::t('common', 'Чт'); ?>",
						"<? echo Yii::t('common', 'Пт'); ?>",
						"<? echo Yii::t('common', 'Сб'); ?>"
					],
					monthNames: [
						"<? echo Yii::t('common', 'Январь'); ?>",
						"<? echo Yii::t('common', 'Февраль'); ?>",
						"<? echo Yii::t('common', 'Март'); ?>",
						"<? echo Yii::t('common', 'Апрель'); ?>",
						"<? echo Yii::t('common', 'Май'); ?>",
						"<? echo Yii::t('common', 'Июнь'); ?>",
						"<? echo Yii::t('common', 'Июль'); ?>",
						"<? echo Yii::t('common', 'Август'); ?>",
						"<? echo Yii::t('common', 'Сентябрь'); ?>",
						"<? echo Yii::t('common', 'Октябрь'); ?>",
						"<? echo Yii::t('common', 'Ноябрь'); ?>",
						"<? echo Yii::t('common', 'Декабрь'); ?>"
					],
					firstDay: 1
				}
			};
			// Формирование календаря для больших экаранов
			$('#reportrange span').html(string_date);
			$('#reportrange').daterangepicker(daterangepicker_setting, do_daterangepicker_stuff);
			// Формирование календаря для малых экаранов
			$('#reportrange-header span').html(string_date);
			$('#reportrange-header').daterangepicker(daterangepicker_setting, do_daterangepicker_stuff);

			const input_sdate = "<? echo "<input type='time' class='input-mini2 m-l-10' id='start_time' value='{$s_time}'>" ?>";
			$(".daterangepicker_start_input").append(input_sdate);
			const input_fdate = "<? echo "<input type='time' class='input-mini m-l-10' id='end_time' value='{$f_time}'>" ?>";
			$(".daterangepicker_end_input").append(input_fdate);
			stabilize_daterangepicker();
		}

		function document_ready() {
			// v:004-92M
			create_daterangepicker();
			// Кнопка на выборку страны
			var news_place_id = $('#news_place_id').val();
			if (news_place_id != 0 && news_place_id != '') {
				$('.filter_country .btn').removeClass('btn-white');
				$('.filter_country .btn').addClass('btn-imas-yellow');
				$('.filter_country .fa').addClass('fa-check');
			}

			// Анимация
			$('.animation_select').click(function() {
				$('#animation_block').removeAttr('class').attr('class', '');
				var animation = $(this).attr("data-animation");
				$('#animation_block').addClass('animated');
				$('#animation_block').addClass(animation);
				return false;
			});
		}
	</script>

	<!--  Основные функции -->
	<script>
		// Вызов меню навигации +
		function social_publications_count(p_id, type_news, s_date, f_date, s_time, f_time, res_id, sentiment, place, place_id) {
			$.ajax({
				url: "<?= $lang ?>/projectstats/socialpublicationscount",
				data: {
					p_id: p_id,
					lg_filter: '<?= $lg_filter ?>',
					type_news: type_news,
					s_date_project: "<?= $s_date_project ?>",
					f_date_project: "<?= $f_date_project ?>",
					s_date: s_date,
					f_date: f_date,
					s_time: s_time,
					f_time: f_time,
					res_id: res_id,
					sentiment: sentiment,
					place: place,
					place_id: place_id
				},
				type: "GET",
				success: function(data) {
					// console.log(data);
					$('.menu_social_navigation').html(data);
				}
			});
		}

		// Меню навигации +
		function show_category_news(type_news, type) {
			// Получем текущий URL
			var search = window.location.search;
			var actual_url = replace_Query_Param('t', type_news, search);
			actual_url = replace_Query_Param('p', 1, actual_url);


			get_dynamic(<?= $p_id; ?>, type_news, 'date', '<?= $s_date; ?>', '<?= $f_date; ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');

			sentiments_count(<?= $p_id; ?>, type_news, '<?= $s_date; ?>', '<?= $f_date; ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');

			get_news(1, type_news, '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>);

			$('.menu_block.active').removeClass("active");
			$('.menu_social_navigation_' + type).addClass("active");

			$('#type_news').val(type_news);

			// Заносим данные для работы с историей Браузера
			var object_state = {
				p_id: <?= $p_id; ?>,
				type_news: type_news,
				type: 'date',
				s_date: '<?= $s_date; ?>',
				f_date: '<?= $f_date; ?>',
				res_id: <?= $res_id ?>,
				sentiment: '<?= $sentiment ?>',
				place: '<?= $place ?>',
				place_id: '<?= $place_id ?>',
				active_number: type,
			};

			// Меняем URL без подгрузки страницы
			history.pushState(object_state, null, '<?= $lang ?>/tape' + actual_url);
		}

		// Работа с историей браузера, неперегружает сраницу при нажатии назад и вперед, так как выше мы меняли URL без подгрузки страницы +
		$(window).bind("popstate", function(type_news) {
			var state = type_news.originalEvent.state;
			if (state.type_news) {
				get_dynamic(state.p_id, state.type_news, state.type, state.s_date, state.f_date, state.res_id, state.sentiment, state.place, state.place_id, state.vn);
				$('.product-box.active').removeClass("active");
				$('.menu_social_navigation_' + state.active_number).addClass("active");
			}
		});

		// Динамика +
		function get_dynamic(p_id, type_news, type, s_date, f_date, s_time, f_time, res_id, sentiment, place, place_id) {
			var all = '';
			var name = '<? echo Yii::t('common', 'Публикаций'); ?>'
			if (type_news == 'all') {
				var name = '<? echo Yii::t('common', 'СМИ + Соцсети'); ?>';
				var all = '<? echo Yii::t('common', 'СМИ + Соцсети: '); ?>';
			}

			minRange = 31 * 24 * 3600 * 1000;
			type = 'date';
			if (s_date == f_date) {
				minRange = 24 * 3600 * 1000;
				type = 'one_day';
			}

			$.ajax({
				url: "<?= $lang ?>/projectstats",
				data: {
					p_id: p_id,
					lg_filter: '<?= $lg_filter ?>',
					type_news: type_news,
					type: type,
					s_date_project: <?= $s_date_project ?>,
					f_date_project: <?= $f_date_project ?>,
					s_date: s_date,
					f_date: f_date,
					s_time: s_time,
					f_time: f_time,
					res_id: res_id,
					sentiment: sentiment,
					place: place,
					place_id: place_id
				},
				type: "GET",
				success: function(data) {
					var obj = jQuery.parseJSON(data);
					var k = 0;
					var data_dates = [];
					var data_counts1 = [];
					$.each(obj, function(key, data) {
						key = key.replace(/-/g, '/');
						data_dates[k] = new timezoneJS.Date(key, 'Asia/Almaty');
						data_dates[k] = data_dates[k]._timeProxy;

						$.each(data, function(key, value) {
							if (key == 'total') data_counts1[k] = [data_dates[k], parseInt(value)];

						});
						k++;
					});
					// console.log(data_counts1);

					Highcharts.setOptions({
						lang: {
							shortMonths: [
								'<? echo Yii::t('common', 'янв'); ?>',
								'<? echo Yii::t('common', 'фев'); ?>',
								'<? echo Yii::t('common', 'мар'); ?>',
								'<? echo Yii::t('common', 'апр'); ?>',
								'<? echo Yii::t('common', 'май'); ?>',
								'<? echo Yii::t('common', 'июнь'); ?>',
								'<? echo Yii::t('common', 'июль'); ?>',
								'<? echo Yii::t('common', 'авг'); ?>',
								'<? echo Yii::t('common', 'сент'); ?>',
								'<? echo Yii::t('common', 'окт'); ?>',
								'<? echo Yii::t('common', 'ноя'); ?>',
								'<? echo Yii::t('common', 'дек'); ?>'
							],
							weekdays: [
								'<? echo Yii::t('common', 'Воскресенье'); ?>',
								'<? echo Yii::t('common', 'Понедельник'); ?>',
								'<? echo Yii::t('common', 'Вторник'); ?>',
								'<? echo Yii::t('common', 'Среда'); ?>',
								'<? echo Yii::t('common', 'Четверг'); ?>',
								'<? echo Yii::t('common', 'Пятница'); ?>',
								'<? echo Yii::t('common', 'Суббота'); ?>'
							],
						}
					});

					$('#modal_dynamics').highcharts({
						credits: {
							enabled: false
						},
						chart: {
							zoomType: 'x'
						},
						title: {
							text: '<? echo Yii::t('common', 'Динамика'); ?>',
							align: 'left',
							style: {
								color: '#fff',
								fontSize: '1px'
							}

						},

						legend: {
							align: 'right',
							verticalAlign: 'top',
							floating: true,
							borderWidth: 0,
							x: 0,
							y: -15,
							reversed: true,
						},

						xAxis: {
							type: 'datetime',
							minRange: minRange,
							gridLineWidth: 1,
							gridLineColor: '#e4e4e4',
							gridLineDashStyle: 'dot',
							// min: 1547856000000,
							<? if ($s_date != $f_date) { ?>
								min: <? echo strtotime($s_date . ' ' . $s_time) . '000'; ?>,
								max: <? echo strtotime($f_date . ' ' . $f_time) . '000'; ?>,
							<? } ?>
						},

						yAxis: {
							categories: [],
							labels: {
								style: {
									color: '#333'
								}
							},
							allowDecimals: false,
							title: {
								text: ''
							},
							min: 0,
							tickInterval: 1,
							gridLineWidth: 1,
							gridLineColor: '#e4e4e4',
							gridLineDashStyle: 'dot'
						},

						tooltip: {
							pointFormat: '<? echo Yii::t('common', 'Публикаций'); ?>: <b>{point.y}</b><br/>',
						},

						plotOptions: {
							series: {
								lineWidth: 2,
								fillOpacity: 0.1,
								allowPointSelect: true,
								marker: {
									symbol: 'diamond',
									radius: 1.0,

									states: {
										select: {
											radius: 6.0,
											enabled: true,
											fillColor: '#A7B1C2',
											lineColor: '#2f4050',
										}
									}
								},
							}
						},

						series: [{
							point: {
								events: {
									click: function(e) {
										if (this.selected === true) {
											if (s_date == f_date) {
												get_news(1, type_news, s_date, f_date, s_time, f_time, <?= $res_id ?>);
											} else {
												get_news(1, type_news, s_date, f_date, '00:00', '23:59', <?= $res_id ?>);
											}
										} else {
											if (s_date == f_date) {
												get_news(1, type_news, Highcharts.dateFormat('%Y-%m-%d', this.x), Highcharts.dateFormat('%Y-%m-%d', this.x), Highcharts.dateFormat('%H:00', this.x), Highcharts.dateFormat('%H:59', this.x), <?= $res_id ?>);
											} else {
												get_news(1, type_news, Highcharts.dateFormat('%Y-%m-%d', this.x), Highcharts.dateFormat('%Y-%m-%d', this.x), '00:00', '23:59', <?= $res_id ?>);
											}
										}
									}
								}
							},
							name: 'Кривая',
							type: 'areaspline',
							fillOpacity: 0.1,
							cursor: 'pointer',
							pointInterval: 24 * 3600 * 1000,
							pointStart: Date.UTC(2012, 0, 1),
							data: data_counts1,
							showInLegend: false,
						}]
					});
				}
			});
		}

		// Кол-во публикаций по тональностям +
		function sentiments_count(p_id, type_news, s_date, f_date, s_time, f_time, res_id, sentiment, place, place_id) {
			$.ajax({
				url: "<?= $lang ?>/projectstats/sentimentscount",
				data: {
					p_id: p_id,
					lg_filter: '<?= $lg_filter ?>',
					type_news: type_news,
					s_date_project: "<?= $s_date_project ?>",
					f_date_project: "<?= $f_date_project ?>",
					s_date: s_date,
					f_date: f_date,
					s_time: s_time,
					f_time: f_time,
					res_id: res_id,
					sentiment: sentiment,
					place: place,
					place_id: place_id
				},
				type: "GET",
				success: function(data) {
					$('.filter_sentiments').html(data);
				}
			});
		}


		// Новости +
		function get_news(page, type_news, s_date, f_date, s_time, f_time, res_id, type_animation) {
			News.prototype.get_news(page, type_news, s_date, f_date, s_time, f_time, res_id, type_animation);
			// Получем текущий URL
			var search = window.location.search;
			var actual_url = replace_Query_Param('p', page, search);
			var sentiment = $("#news_sentiment").val();
			if (sentiment == '<? echo Yii::t('common', 'позитив'); ?>') sentiment = '1';
			if (sentiment == '<? echo Yii::t('common', 'негатив'); ?>') sentiment = '2';
			if (sentiment == '<? echo Yii::t('common', 'нейтрал'); ?>') sentiment = '3';
			var place = $("#news_place").val();
			var place_id = $("#news_place_id").val();

			// Заносим данные для работы с историей Браузера
			var object_state = {
				p_id: <?= $p_id; ?>,
				type_news: type_news,
				page: page,
				s_date: s_date,
				f_date: f_date,
				res_id: res_id,
				sentiment: sentiment,
				place: place,
				place_id: place_id,
			};

			<?php /*
			$('#page_input').val(page);

			$.ajax({
				url: "<?=$lang?>/news",
				data : {
					p_id: <?=$p_id;?>,
					lg_filter: '<?=$lg_filter?>',
					type_news: type_news,
					page: page,
					s_date: s_date,
					f_date: f_date,
					s_time: s_time,
					f_time: f_time,
					res_id: res_id,
					sentiment: sentiment,
					place: place,
					place_id: place_id,
				},
				type : "GET",
				success: function(data){
					$("#project_news").html(data);
					if(type_animation != 'no_animation') $('body.fixed-nav #wrapper #page-wrapper').animate({scrollTop:0}, 'slow');
				}
			});

			$.ajax({
				type : "GET",
				url: "",
				data : {p: page},
				success: function(data){

				}
			});
			*/ ?>
			// Меняем URL без подгрузки страницы
			history.pushState(object_state, null, '<?= $lang ?>/tape' + actual_url);
		}


		// Копирование id-новости
		function copy_id_news(id_news) {
			var tmp = document.createElement('INPUT');
			tmp.value = id_news;

			document.body.appendChild(tmp);
			tmp.select();
			document.execCommand('copy');
			document.body.removeChild(tmp);
		}


		// Работа с историей браузера, неперегружает сраницу при нажатии назад и вперед, так как выше мы меняли URL без подгрузки страницы
		$(window).bind("popstate", function(page) {
			var state = page.originalEvent.state;
			if (state.p_id) {
				$.ajax({
					url: "<?= $lang ?>/news",
					data: {
						p_id: state.p_id,
						lg_filter: '<?= $lg_filter ?>',
						type_news: state.type_news,
						page: state.page,
						s_date_project: <?= $s_date_project ?>,
						f_date_project: <?= $f_date_project ?>,
						s_date: state.s_date,
						f_date: state.f_date,
						s_time: state.s_time,
						f_time: state.f_time,
						res_id: state.res_id,
						sentiment: state.sentiment,
						place: state.place,
						place_id: state.place_id,
						vn: state.vn
					},
					type: "GET",
					success: function(data) {
						$("#project_news").html(data);
					}
				});
			}
		});
	</script>

	<!--  Функции по блоку новостей -->
	<script>
		// Кол-во публикаций в левом меню
		function left_menu_count(p_id) {
			$.ajax({
				url: "<?= $lang ?>/projectstats/countleftmenu",
				data: {
					p_id: p_id,
				},
				type: "GET",
				success: function(data) {
					// console.log(data);
					$('#count_publicate_' + p_id).text(data);
				}
			});
		}

		// Вызов одной новости
		function get_one_news(id, r_type, p_id) {
			$.ajax({
				url: "<?= $lang ?>/news/one",
				data: {
					id: id,
					r_type: r_type,
					p_id: p_id
				},
				type: "GET",
				success: function(data) {
					$("#one_news").html(data);
					var height_title_news = $('#modal_one_news_smi .title_news').height();
					if (height_title_news + 60 > 121) {
						$('#modal_one_news_smi .modal-content .modal-header').css('height', height_title_news + 60 + 'px');
						$('#modal_one_news_smi .modal-content .modal-header').css('min-height', height_title_news + 60 + 'px');
						$('#modal_one_news_smi .modal-content .modal-header').css('max-height', height_title_news + 60 + 'px');
					}
				}
			});
		}

		// Удаление новости с проекта
		function delete_from_project(r_type, id) {
			var type_news = $('#type_news').val();
			var page_input = $('#page_input').val();
			$.ajax({
				url: "<?= $lang ?>/news/deletenews",
				data: {
					p_id: <?= $p_id; ?>,
					id: id,
					r_type: r_type
				},
				type: "GET",
				success: function(data) {
					$(".news_block_" + r_type + "_" + id).removeClass("fadeIn");
					$(".news_block_" + r_type + "_" + id).addClass("fadeOut");
					// Обновляем Левое Меню
					left_menu_count(<?= $p_id ?>);
					// Обновляем Меню навигации
					social_publications_count(<?= $p_id ?>, type_news, '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
					// Обновляем кол-во фильтр Тональности
					sentiments_count(<?= $p_id ?>, type_news, '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
					// Обновляем Динамику
					get_dynamic(<?= $p_id ?>, type_news, 'date', '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');

					function func() {
						$(".news_block_" + r_type + "_" + id + ".fadeOut").remove();
						$("#modal_one_news_smi").modal('hide');
						// Обновляем Новости
						get_news(page_input, type_news, '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, 'no_animation');
					}
					setTimeout(func, 700);

				}
			});

		}

		// Вызов Удаление Ресурса с проекта
		function delete_resource_from_project(r_type, res_id) {
			// $('#modal_one_news_smi').modal('hide');
			$("#delete_resource_res_id").val(res_id);
			$("#delete_resource_r_type").val(r_type);
			$.ajax({
				url: "<?= $lang ?>/projectstats/resourceinfo",
				data: {
					p_id: <?= $p_id; ?>,
					res_id: res_id,
					r_type: r_type
				},
				type: "GET",
				success: function(data) {
					$("#del_res_info").html(data);
				}
			});
		}

		// Удаление Ресурса с проекта
		function delete_resource_confirm(del_type) {
			var type_news = $('#type_news').val();
			var res_id = $("#delete_resource_res_id").val();
			var r_type = $("#delete_resource_r_type").val();
			var page_input = $('#page_input').val();
			$.ajax({
				url: "<?= $lang ?>/projectstats/deleteresource",
				data: {
					p_id: <?= $p_id; ?>,
					res_id: res_id,
					r_type: r_type,
					del_type: del_type
				},
				type: "GET",
				success: function(data) {
					// Обновляем Левое Меню
					left_menu_count(<?= $p_id ?>);
					// Обновляем Меню навигации
					social_publications_count(<?= $p_id ?>, type_news, '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
					// Обновляем кол-во фильтр Тональности
					sentiments_count(<?= $p_id ?>, type_news, '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
					// Обновляем Динамику
					get_dynamic(<?= $p_id ?>, type_news, 'date', '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
					get_news(page_input, type_news, '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, 'no_animation');
					$('#modal_one_news_smi').modal('hide');
				}
			});
		}

		// Проставление ручной тональности
		function update_sentiment(r_type, id, sentiment, projectId = 0) {
			var type_news = $('#type_news').val();
			$.ajax({
				url: "<?= $lang ?>/news/updatesentiment",
				data: {
					id: id,
					r_type: r_type,
					sentiment: sentiment,
					p_id: <?= $p_id ?>
				},
				type: "GET",
				success: function(data) {
					$(".news_sentiment_" + r_type + "_" + id).html(data);
					sentiments_count(<?= $p_id ?>, type_news, '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
				}
			});
		}

		// Вызов списка избранных в котором есть данная новость
		function get_labels_list(r_type, news_id) {
			$("#label_checked_news_id").val(news_id);
			$("#label_checked_r_type").val(r_type);
			$.ajax({
				url: "<?= $lang ?>/news/labelslist",
				type: "GET",
				data: {
					news_id: news_id,
					r_type: r_type
				},
				success: function(data) {
					$("#labels_list").html(data);
					$('.footable').footable();
					// v:004-42M
					$("#button-change-label-display").attr('data-news-info', `${r_type};${news_id}`);
					$("#button-change-label-display").text('<? echo Yii::t('common', 'Показать отмеченные теги'); ?>');
				}
			});
		}

		function get_news_labels(r_type, news_id) {
			$.ajax({
				url: "<?= $lang ?>/news/labelslistbynewsid",
				type: "GET",
				data: {
					news_id: news_id,
					r_type: r_type
				},
				success: function(data) {
					$("#news_" + r_type + "_" + news_id + "_labels").html(data);
					$("#one_news_" + r_type + "_" + news_id + "_labels").html(data);
				}
			});
		}

		// Добавление в избранное
		function add_label(l_id) {
			var news_id = $("#label_checked_news_id").val();
			var r_type = $("#label_checked_r_type").val();
			$.ajax({
				url: "<?= $lang ?>/news/addlabel",
				data: {
					l_id: l_id,
					news_id: news_id,
					r_type: r_type,
					p_id: <?= $p_id; ?>
				},
				type: "GET",
				success: function(data) {
					get_news_labels(r_type, news_id);
					get_labels_list(r_type, news_id);
				}
			});
		}

		// Удаление из избранного с модального списка
		function delete_label(l_id) {
			var news_id = $("#label_checked_news_id").val();
			var r_type = $("#label_checked_r_type").val();
			$.ajax({
				url: "<?= $lang ?>/news/deletelabel",
				data: {
					l_id: l_id,
					news_id: news_id,
					r_type: r_type
				},
				type: "GET",
				success: function(data) {
					get_news_labels(r_type, news_id);
					get_labels_list(r_type, news_id);
				}
			});
		}

		// Удаление из избранного с блока новости
		function delete_label_with_id(l_id, r_type, news_id) {
			$.ajax({
				url: "<?= $lang ?>/news/deletelabel",
				data: {
					l_id: l_id,
					news_id: news_id,
					r_type: r_type
				},
				type: "GET",
				success: function(data) {
					get_news_labels(r_type, news_id);
				}
			});
		}

		// Список избранного для одной новости в полном режиме
		function get_news_labels_one_news(r_type, news_id) {
			$.ajax({
				url: "<?= $lang ?>/news/labelslistbynewsid",
				type: "GET",
				data: {
					news_id: news_id,
					r_type: r_type
				},
				success: function(data) {
					$("#one_news_" + r_type + "_" + news_id + "_labels").html(data);
				}
			});
		}

		// Создание нового избранного
		function add_new_labels() {
			var name = $('#new_name_labels').val();
			var news_id = $("#label_checked_news_id").val();
			var r_type = $("#label_checked_r_type").val();
			if (name != '') {
				$.ajax({
					type: "POST",
					url: "<?= $lang ?>/newlabels",
					data: {
						new_labels: 'true',
						name: name
					},
					success: function(data) {
						$('#new_name_labels').val('');
						add_label(data);
						get_labels_list(r_type, news_id);

					}
				});
			}
		}

		function clear_input_name() {
			$('#new_name_labels').val('');
			$('.modal-backdrop').attr('style', 'z-index: 2040 !important');
		}

		function close_modal() {
			$('.modal-backdrop').attr('style', 'z-index: 2040 !important');
		}
	</script>

	<!-- функции для адаптивной версии -->
	<script>
		//v:004-42M
		// Режим показа списка папок через модалку
		function toggle_labellist_vision({
			id,
			textContent,
			dataset
		}) {
			var news_data = dataset.newsInfo.split(";");
			var selected_mode = ['<? echo Yii::t('common', 'Показать отмеченные теги'); ?>', '<? echo Yii::t('common', 'Показать все теги'); ?>'];
			var urls = ['<?= $lang ?>/news/selected_labelslist', '<?= $lang ?>/news/labelslist'];
			var mode_index = selected_mode.indexOf(textContent);
			var url = urls[mode_index];
			var new_text = selected_mode.reverse()[mode_index]
			var r_type = news_data[0]
			var news_id = news_data[1];
			$.ajax({
				url: url,
				type: "GET",
				data: {
					news_id: news_id,
					r_type: r_type
				},
				success: function(data) {
					$("#labels_list").html(data);
					$("#button-change-label-display").text(new_text);
				}
			});
		}
		// v:004-72M
		// Основная функция для изменение тональности в мобильной версии
		function change_sentiment_adaptive({
			textContent,
			dataset
		}) {
			textContent = textContent.trim();
			var r_type = dataset.newsR_type;
			var news_id = dataset.newsId;
			var sentiment = dataset.sentimentInfo;
			const ajax_response = sentiment_tools.ajax_queries.do_updateSentiment_ajax(r_type, news_id, sentiment);
			if (ajax_response) {
				$(`.news_sentiment_${r_type}_${news_id}`).html(ajax_response);
				change_sentiment_min_label({
					news_id,
					r_type,
					sentiment
				});
				change_sentiment_label({
					news_id,
					r_type,
					sentiment
				});
				const news_type = $('#type_news').val();
			}
		}

		// Изменяет button sentiment в min_news_footer на выбранный sentiment
		function change_sentiment_label({
			news_id,
			r_type,
			sentiment
		}) {
			var words = ['Позитив', 'Нейтрал', 'Негатив'];
			var classes = ['sentiment_positive', 'sentiment_neitral', 'sentiment_negative'];
			var sentiments = ['1', '0', '-1'];
			var index = sentiments.indexOf(sentiment);
			var button = $(`#adaptive-sentiment-${r_type}-${news_id}`);
			button.removeClass("sentiment_positive sentiment_neitral sentiment_negative");
			button.addClass(classes[index]);
			button.text(words[index]);
		}

		// Изменяет label sentiment в dropdown-menu на выбранный sentiment
		function change_sentiment_min_label({
			news_id,
			r_type,
			sentiment
		}) {
			for (var i = -1; i < 2; i++) {
				$(`.adaptive-sentiment-min_${i}_-${r_type}-${news_id}`).removeClass('fa-check-circle');
				$(`.adaptive-sentiment-min_${i}_-${r_type}-${news_id}`).addClass('fa-circle');
			}
			var selected_icon = $(`.adaptive-sentiment-min_${sentiment}_-${r_type}-${news_id}`);
			selected_icon.addClass('fa-check-circle');
			selected_icon.removeClass('fa-circle');
		}

		// ajax запрос на изменение sentiment. Убран в sentiment_tools.ajax_queries
		function do_updateSentiment_ajax(r_type, id, sentiment) {
			var result;
			try {
				result = $.ajax({
					url: "<?= $lang ?>/news/updatesentiment",
					data: {
						id: id,
						r_type: r_type,
						sentiment: sentiment,
						p_id: <?= $p_id ?>
					},
					type: "GET",
					async: false
				}).responseText;
				return result;
			} catch (error) {
				// console.log(error);
			}
		}

		const sentiment_tools = {
			modal_one_news: {
				add_classes: function(dom_element, classes) {
					classes.split(" ").forEach(function(class_name) {
						dom_element.classList.add(class_name);
					});
				},
				remove_classes: function(dom_element, classes) {
					classes.split(" ").forEach(function(class_name) {
						dom_element.classList.remove(class_name);
					})
				},
				get_sentiment_class: function(jquery_button) {
					const class_name_of_sentiments = ["sentiment_negative", "sentiment_neitral", "sentiment_positive"];
					const button_text = jquery_button.text().trim();
					const index = ["Негатив", "Нейтрал", "Позитив"].indexOf(button_text);
					if (index != -1) {
						return class_name_of_sentiments[index];
					}
					// console.log("Cant find the sentiment");
				},
				get_old_button_data: function(jquery_button) {
					const class_name = this.get_sentiment_class(jquery_button);
					const index = ["sentiment_negative", "sentiment_neitral", "sentiment_positive"].indexOf(class_name);
					const sentiment = [-1, 0, 1][index];
					const text = ["Негатив", "Нейтрал", "Позитив"][index];
					return {
						class_name,
						sentiment,
						text
					};
				},
				change_sentiment_new: function({
					textContent,
					dataset
				}) {
					const r_type = dataset.newsR_type;
					const news_id = dataset.newsId;
					const sentiment = dataset.sentimentInfo;
					const ajax_response = sentiment_tools.ajax_queries.do_updateSentiment_ajax(r_type, news_id, sentiment);
					if (ajax_response) {
						const control_panel = $("#modal_one_news_smi .modal-body .rmax-width-768");
						const button = control_panel.find('.dropdown-toggle');
						const old_button_data = this.get_old_button_data(button);
						// Меняем текст и цвет
						button.text(textContent.trim());
						button.removeClass("sentiment_positive sentiment_neitral sentiment_negative");
						const new_class = this.get_sentiment_class(button);
						if (new_class)
							button.addClass(new_class);
						// Меняем остальные button
						const dropdown_menu = Array.from(control_panel.find(".dropdown-menu li button"));
						dropdown_menu.forEach(function(dropdown_button) {
							if (dropdown_button.innerText.trim() == textContent.trim()) {
								console.table({
									button_data: dropdown_button.innerText,
									old_button_data
								});
								dropdown_button.innerText = old_button_data.text.trim();
								sentiment_tools.modal_one_news.remove_classes(dropdown_button, "sentiment_positive sentiment_neitral sentiment_negative");
								sentiment_tools.modal_one_news.add_classes(dropdown_button, old_button_data.class_name);
								dropdown_button.dataset.sentimentInfo = old_button_data.sentiment;
							}
						});

						$(`.news_sentiment_${r_type}_${news_id}`).html(ajax_response);
						sentiment_tools.change_sentiment_min_label({
							news_id,
							r_type,
							sentiment
						});
						sentiment_tools.change_sentiment_label({
							news_id,
							r_type,
							sentiment
						});
						const type_news = $('#type_news').val();
						sentiments_count(<?= $p_id ?>, type_news, '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>');
					}
				}
			},
			change_sentiment_adaptive: function() {
				textContent = textContent.trim();
				var r_type = dataset.newsR_type;
				var news_id = dataset.newsId;
				var sentiment = dataset.sentimentInfo;
				const ajax_response = sentiment_tools.ajax_queries.do_updateSentiment_ajax(r_type, news_id, sentiment);
				if (ajax_response) {
					$(`.news_sentiment_${r_type}_${news_id}`).html(ajax_response);
					sentiment_tools.change_sentiment_min_label({
						news_id,
						r_type,
						sentiment
					});
					sentiment_tools.change_sentiment_label({
						news_id,
						r_type,
						sentiment
					});
					const news_type = $('#type_news').val();
				}
			},
			change_sentiment_min_label: function({
				news_id,
				r_type,
				sentiment
			}) {
				for (var i = -1; i < 2; i++) {
					$(`.adaptive-sentiment-min_${i}_-${r_type}-${news_id}`).removeClass('fa-check-circle');
					$(`.adaptive-sentiment-min_${i}_-${r_type}-${news_id}`).addClass('fa-circle');
				}
				var selected_icon = $(`.adaptive-sentiment-min_${sentiment}_-${r_type}-${news_id}`);
				selected_icon.addClass('fa-check-circle');
				selected_icon.removeClass('fa-circle');
			},
			change_sentiment_label: function({
				news_id,
				r_type,
				sentiment
			}) {
				var words = ['Позитив', 'Нейтрал', 'Негатив'];
				var classes = ['sentiment_positive', 'sentiment_neitral', 'sentiment_negative'];
				var sentiments = ['1', '0', '-1'];
				var index = sentiments.indexOf(sentiment);
				var button = $(`#adaptive-sentiment-${r_type}-${news_id}`);
				button.removeClass("sentiment_positive sentiment_neitral sentiment_negative");
				button.addClass(classes[index]);
				button.text(words[index]);
			},
			ajax_queries: {
				do_updateSentiment_ajax: function(r_type, id, sentiment) {
					var result;
					try {
						result = $.ajax({
							url: "<?= $lang ?>/news/updatesentiment",
							data: {
								id: id,
								r_type: r_type,
								sentiment: sentiment,
								p_id: <?= $p_id ?>
							},
							type: "GET",
							async: false
						}).responseText;
						return result;
					} catch (error) {
						// console.log(error);
					}
				}
			}
		}
	</script>

	<!-- Блок Фильтра -->
	<script>
		// Вызов и Формирование Страны
		function show_modal_country() {
			$('#modal_country').modal({
				backdrop: 'static',
				keyboard: false
			})
			var country_id = $('#place_id_filter').val();
			var type_news = $('#type_news').val();
			if (country_id == '') {
				$.ajax({
					url: "<?= $lang ?>/projectstats/countries",
					type: "GET",
					data: {
						p_id: <?= $p_id; ?>,
						lang: '<?= $lg_filter; ?>',
						s_date_project: '<?= $s_date_project; ?>',
						f_date_project: '<?= $f_date_project; ?>',
						s_date: '<?= $s_date; ?>',
						f_date: '<?= $f_date; ?>',
						s_time: '<?= $s_time; ?>',
						f_time: '<?= $f_time; ?>',
						res_id: <?= $res_id ?>,
						type_news: type_news,
						sentiment: '<?= $sentiment ?>',
						place: '<?= $place ?>',
						place_id: '<?= $place_id ?>'
					},
					success: function(data) {
						$("#modal_country_list").html(data);

						$('.dual_select').bootstrapDualListbox({
							infoText: '<? echo Yii::t('common', 'Показаны все'); ?> {0}',
							filterTextClear: '<? echo Yii::t('common', 'Показать всё'); ?>',
							filterPlaceHolder: '<? echo Yii::t('common', 'Поиск по странам'); ?>',
							infoTextFiltered: '<span class="label label-warning f-s-10"><? echo Yii::t('common', 'Найдено'); ?></span> {0} <? echo Yii::t('common', 'из'); ?> {1}',
							infoTextEmpty: '<? echo Yii::t('common', 'Пустой список'); ?>',
							moveAllLabel: '<? echo Yii::t('common', 'Переместить всё'); ?>',
							removeAllLabel: '<? echo Yii::t('common', 'Удалить всё'); ?>',
							selectorMinimalHeight: 260
						});
					}
				});
			}
		}

		// Сохранить выборку по странам
		function save_filter_country() {
			var country_id = $('#bootstrap-duallistbox-selected-list_ .imas-country-select').val();
			if (typeof country_id == 'undefined') {
				$('#place_filter').val('<?= $project_place ?>');
				$('#place_id_filter').val('<?= $project_place_id ?>');
				$('#place_id_filter2').val('<?= $project_place_id ?>');

				$('.filter_country .btn').removeClass('btn-imas-yellow');
				$('.filter_country .btn').addClass('btn-white');
				$('.filter_country .fa').removeClass('fa-check');
			} else {
				var place_id = '';
				// Проходим по каждой Стране <option>
				$("#bootstrap-duallistbox-selected-list_  .imas-country-select").each(function() {
					continents = $(this).val() + ",";
					place_id = place_id + continents;
				});
				place_id = place_id.slice(0, -1);
				// alert(place_id);

				$('#place_filter').val('2');
				$('#place_id_filter').val(place_id);
				$('#place_id_filter2').val(place_id);

				$('.filter_country .btn').removeClass('btn-white');
				$('.filter_country .btn').addClass('btn-imas-yellow');
				$('.filter_country .fa').addClass('fa-check');
			}
		}

		// Кнопки по тональностям для чекета
		function pos_sentiment() {
			if ($("#pos_sentiment_filter input").is(':checked') == false) {
				$('#pos_sentiment_filter input').prop('checked', true);
				$('#pos_sentiment_filter i').css('display', 'block');
			} else {
				$('#pos_sentiment_filter input').prop('checked', false);
				$('#pos_sentiment_filter i').css('display', 'none');
			}
		}

		function neg_sentiment() {
			if ($("#neg_sentiment_filter input").is(':checked') == false) {
				$('#neg_sentiment_filter input').prop('checked', true);
				$('#neg_sentiment_filter i').css('display', 'block');
			} else {
				$('#neg_sentiment_filter input').prop('checked', false);
				$('#neg_sentiment_filter i').css('display', 'none');
			}
		}

		function neu_sentiment() {
			if ($("#neu_sentiment_filter input").is(':checked') == false) {
				$('#neu_sentiment_filter input').prop('checked', true);
				$('#neu_sentiment_filter i').css('display', 'block');
			} else {
				$('#neu_sentiment_filter input').prop('checked', false);
				$('#neu_sentiment_filter i').css('display', 'none');
			}
		}

		function not_sentiment() {
			if ($("#not_sentiment_filter input").is(':checked') == false) {
				$('#not_sentiment_filter input').prop('checked', true);
				$('#not_sentiment_filter i').css('display', 'block');
			} else {
				$('#not_sentiment_filter input').prop('checked', false);
				$('#not_sentiment_filter i').css('display', 'none');
			}
		}

		// Применить фильтр
		function filter_page() {
			var place = $('#place_filter').val();
			var place_id = $('#place_id_filter2').val();

			if (place_id == '') {
				place = '<?= $project_place ?>';
				place_id = '<?= $project_place_id ?>';
			}

			var type_news = $('#type_news').val();
			if (type_news == '') type_news = '<?= $type_news ?>';
			var s_date = $("#s_date_filter").val();
			var f_date = $("#f_date_filter").val();
			if (s_date == '') s_date = '<?= $s_date ?>';
			if (f_date == '') f_date = '<?= $f_date ?>';

			var s_time = $("#start_time").val();
			var f_time = $("#end_time").val();
			if (s_time == '') s_time = '<?= $s_time ?>';
			if (f_time == '') f_time = '<?= $f_time ?>';


			var sentiment = '';
			if ($("#pos_sentiment_filter input").prop("checked")) sentiment = sentiment + '1,';
			if ($("#neg_sentiment_filter input").prop("checked")) sentiment = sentiment + '-1,';
			if ($("#neu_sentiment_filter input").prop("checked")) sentiment = sentiment + '0,';
			var sent_length = sentiment.length;
			if (sentiment[sent_length - 1] == ',') sentiment = sentiment.substr(0, (sent_length - 1));


			var lg_filter = '';
			const view_width = document.getElementById("wrapper").offsetWidth;
			<?
			$all_langs = array();
			foreach ($languages as $language) {
				$all_langs[] = $language['id']; ?>
				if (view_width >= 768) {
					if ($("#lang_filter_<?= $language['id'] ?>").prop("checked")) lg_filter = lg_filter + '<?= $language['id'] ?>,';
				} else {
					if ($("#adaptive_lang_filter_<?= $language['id'] ?>").prop("checked")) lg_filter = lg_filter + '<?= $language['id'] ?>,';
				}
			<? }
			$all_langs_str = implode(',', $all_langs);
			?>

			var lg_length = lg_filter.length;
			if (lg_filter[lg_length - 1] == ',') lg_filter = lg_filter.substr(0, (lg_length - 1));

			if (lg_filter == '<?= $all_langs_str ?>') lg_filter = 'all';

			// alert(lg_filter);

			var link = "/tape?id=<?= $p_id ?>&t=" + type_news + "&s_date=" + s_date + "&s_time=" + s_time + "&f_date=" + f_date + "&f_time=" + f_time + "&sentiment=" + sentiment + "&lg_filter=" + lg_filter + "&place=" + place + "&place_id=" + place_id + '&p=1';

			window.location = link;

		}

		// Сброс фильтра
		function remove_filter_page() {
			var link = "<?= $lang ?>/tape?id=<?= $p_id ?>&t=all&p=1";
			window.location = link;
		}

		// Экспорт
		function export_project(format) {
			if (format != 'pdf_boost') {
				<?
				$message_type = 'all';
				if ($r_type == 1) $message_type = 'smi';
				if ($r_type == 2) $message_type = 'soc';
				if (($place == 2 && $place_id == 57) || $place == 3) $location = 1;
				else $location = 2;
				?>
				// Непонятно зделано с place и place_id. Где-то он берет от news_place/news_place_id или place_filter/place_id_filter2
				var place = $("#place_filter");
				var place_id = $("#place_id_filter2");
				if (!place_id || !place) {
					place = $("#news_place").val();
					place_id = $("#news_place_id").val();
				} else {
					place = $("#place_filter").val();
					place_id = $("#place_id_filter2").val();
				}
				// const url_rest = (format == 'word_format_2' || format == 'pdf2_kaz') ? "http://rest.imas.kz/" : '<?= $urlRest; ?>';
				var url_rest = '<?= $urlRest; ?>';
				place = place_id != 0 ? 2 : place;
				<? $sent_exp = 55;
				if ($sentiment == 1) $sent_exp = 1;
				if ($sentiment == 2) $sent_exp = -1;
				if ($sentiment == 3) $sent_exp = 0; ?>
				var cName = "export2s";
				if (format == "pdf2") {
					cName = "export22s";
				}
				const link = url_rest + cName + "?user_id=<?= $user_id ?>&an_id=<?= $p_id ?>&time=&option=&location=<?= $location ?>&s_date=<?= $s_date ?>&f_date=<?= $f_date ?>&s_time=<?= $s_time ?>&f_time=<?= $f_time ?>&sentiment=<?= $sent_exp ?>&format=" + format + "&country_id=57&alldates=true&message_type=<?= $message_type ?>&lang=ru&place=" + place + "&place_id=" + place_id;
				window.open(link, '_blank');
			} else {
				const link = "<? echo $urlRest; ?>exportpdfs?user_id=<?= $user_id ?>&p_id=<?= $p_id ?>&s_date=<?= $s_date ?>&f_date=<?= $f_date ?>&s_time=<?= $s_time ?>&f_time=<?= $f_time ?>";
				window.open(link, '_blank');
			}
		}

		function export_project2(format, baseLink) {
			if (format != 'pdf_boost') {
				<?
				$message_type = 'all';
				if ($r_type == 1) $message_type = 'smi';
				if ($r_type == 2) $message_type = 'soc';
				if (($place == 2 && $place_id == 57) || $place == 3) $location = 1;
				else $location = 2;
				?>
				// Непонятно зделано с place и place_id. Где-то он берет от news_place/news_place_id или place_filter/place_id_filter2
				var place = $("#place_filter");
				var place_id = $("#place_id_filter2");
				if (!place_id || !place) {
					place = $("#news_place").val();
					place_id = $("#news_place_id").val();
				} else {
					place = $("#place_filter").val();
					place_id = $("#place_id_filter2").val();
				}
				// const url_rest = (format == 'word_format_2' || format == 'pdf2_kaz') ? "http://rest.imas.kz/" : '<?= $urlRest; ?>';
				var url_rest = '<?= $urlRest; ?>';
				place = place_id != 0 ? 2 : place;
				<? $sent_exp = 55;
				if ($sentiment == 1) $sent_exp = 1;
				if ($sentiment == 2) $sent_exp = -1;
				if ($sentiment == 3) $sent_exp = 0; ?>
				var cName = "export2s";
				if (format == "pdf2") {
					cName = "export22s";
				}
				const link = baseLink + "?user_id=<?= $user_id ?>&an_id=<?= $p_id ?>&time=&option=&location=<?= $location ?>&s_date=<?= $s_date ?>&f_date=<?= $f_date ?>&s_time=<?= $s_time ?>&f_time=<?= $f_time ?>&sentiment=<?= $sent_exp ?>&format=" + format + "&country_id=57&alldates=true&message_type=<?= $message_type ?>&lang=ru&place=" + place + "&place_id=" + place_id;
				window.open(link, '_blank');
			} else {
				const link = baseLink + "?user_id=<?= $user_id ?>&p_id=<?= $p_id ?>&s_date=<?= $s_date ?>&f_date=<?= $f_date ?>&s_time=<?= $s_time ?>&f_time=<?= $f_time ?>";
				window.open(link, '_blank');
			}
		}


		// _____________________________________Nexport___________________________________________

		// Эта функция предназначена для nexport_change_r_type
		function nexport_check_by_r_type(input, r_type_config) {
			var permitted_ids = [];
			if (r_type_config == "СМИ и социальные сети")
				permitted_ids = ["nexport-diagram-count", "nexport-diagram-dynamic", "nexport-diagram-sentiment", "nexport-diagram-distriball", "nexport-diagram-distribsmi", "nexport-diagram-distribsoc", "nexport-diagram-location", "nexport-diagram-map", "nexport-diagram-map-1", "nexport-diagram-map-2", "nexport-diagram-activesmi", "nexport-diagram-activesoc", "nexport-diagram-bactivesoc"];
			else if (r_type_config == "СМИ")
				permitted_ids = ["nexport-diagram-count", "nexport-diagram-dynamic", "nexport-diagram-sentiment", "nexport-diagram-distribsmi", "nexport-diagram-location", "nexport-diagram-map", "nexport-diagram-map-1", "nexport-diagram-map-2", "nexport-diagram-activesmi"];
			else if (r_type_config == "Социальные сети")
				permitted_ids = ["nexport-diagram-count", "nexport-diagram-dynamic", "nexport-diagram-sentiment", "nexport-diagram-distribsoc", "nexport-diagram-location", "nexport-diagram-map", "nexport-diagram-map-1", "nexport-diagram-map-2", "nexport-diagram-activesoc", "nexport-diagram-bactivesoc"];
			else
				// console.log("Не найдет r_type_config")

				if (permitted_ids.indexOf(input.id) != -1)
					return true
			else
				return false
		}

		// Меняет r_type, и убирает галочки там, где диаграммы недоступны
		function nexport_change_r_type(r_type_config) {
			var diagram_child_inputs = Array.from(document.getElementsByClassName('nexport-diagram-chlid'));
			diagram_child_inputs.forEach(function(input) {
				if (nexport_check_by_r_type(input, r_type_config)) {
					input.disabled = false;
					document.getElementById(input.id + "-li").classList.remove('d-n');
					input.setAttribute('data-checkable', true)
				} else {
					input.disabled = true;
					document.getElementById(input.id + "-li").classList.add('d-n');
					input.setAttribute('data-checkable', false)
				}
			});
		}

		// Подгружает нужную форму
		function nexport_start(format) {
			if (format == 'PDF') format = 'pdf';
			$.ajax({
				url: "<?= $lang ?>/export/" + format,
				type: "GET",
				beforeSend: function() {
					$("#nexport-body").empty();
				},
				success: function(data) {
					$("#nexport-body").html(data);
					$("#treeview").hummingbird();
				},
				error: function(data) {
					// console.log(`Error: ${this.url}`);
				}
			});
			$("#nexport-modal-body").addClass("vh-75")
			$("#nexport_dbutton").removeClass("hidden");
		}

		function nexport_close_modal() {
			$("#nexport-modal-body").removeClass("vh-75")
			$("#nexport_dbutton").addClass("hidden");
			$("#nexport_type_selector").val('null');
			$("#nexport-body").empty();
		}

		function nexport_pdf_get_vars() {
			var ret = {};
			var r_type_input = document.getElementById('nexport-r_type');
			var r_type = r_type_input.options[r_type_input.selectedIndex].getAttribute('data-r-type')
			ret.r_type_config = r_type;
			ret.count = document.getElementById('nexport-diagram-count').checked;
			ret.diagram1 = document.getElementById('nexport-diagram-dynamic').checked;
			ret.diagram2 = document.getElementById('nexport-diagram-sentiment').checked;
			ret.diagram3 = document.getElementById('nexport-diagram-distriball').checked;
			ret.map_kaz = document.getElementById('nexport-diagram-map-1').checked;
			ret.map_world = document.getElementById('nexport-diagram-map-2').checked;
			ret.diagram5 = document.getElementById('nexport-diagram-distribsmi').checked;
			ret.diagram6 = document.getElementById('nexport-diagram-distribsoc').checked;
			ret.diagram7 = document.getElementById('nexport-diagram-activesmi').checked;
			ret.diagram8 = document.getElementById('nexport-diagram-activesoc').checked;
			ret.diagram9 = document.getElementById('nexport-diagram-bactivesoc').checked;

			ret.newstape = document.getElementById('nexport-tape-parent').checked;
			ret.sentiment = document.getElementById('nexport-tape-sentiment').checked;
			ret.markstr = document.getElementById('nexport-tape-mark').checked;
			if (ret.markstr == true || ret.sentiment == true)
				ret.newstape = true;
			for (key in ret) {
				var tmp = "" + ret[key]
				tmp = tmp.replace("false", 0);
				tmp = tmp.replace("true", 1);
				ret[key] = tmp;
			}
			return ret;
		}

		// Экспорт
		function nexport_download(format) {
			if (format == 'pdf') {
				var params = nexport_pdf_get_vars();
				// console.log(params)
				var link = "http://rest2.imas.kz/exportpdfs?user_id=<?= $user_id ?>&p_id=<?= $p_id ?>&s_date=<?= $s_date ?>&f_date=<?= $f_date ?>&s_time=<? $s_time ?>&f_time=<?= $f_time ?>&r_type=" + params.r_type_config + "&count=" + params.count + "&sentiment=" + params.sentiment + "&location=" + params.location + "&interface_lang=rus&newstape=" + params.newstape + "&diagram1=" + params.diagram1 + "&diagram2=" + params.diagram2 + "&diagram3=" + params.diagram3 + "&map_kaz=" + params.map_kaz + "&map_world=" + params.map_world + "&diagram5=" + params.diagram5 + "&diagram6=" + params.diagram6 + "&diagram7=" + params.diagram7 + "&diagram8=" + params.diagram8 + "&diagram9=" + params.diagram9;
				console.log(link);
				window.open(link);
			}
		}
	</script>

	<script>
		function check_feed_news() {
			var sentiment = $("#news_sentiment").val();
			if (sentiment == 'позитив') sentiment = '1';
			if (sentiment == 'негатив') sentiment = '2';
			if (sentiment == 'нейтрал') sentiment = '3';
			var place = $("#news_place").val();
			var place_id = $("#news_place_id").val();

			var s_date = $("#news_s_date").val();
			var f_date = $("#news_f_date").val();
			var res_id = $("#news_res_id").val();
			var r_type = $("#news_r_type").val();
			var category_id = $("#news_category_id").val();
			var last_time = $("#news_last_time").val();
			$.ajax({
				url: "<?= $lang ?>/news/checknews",
				data: {
					p_id: <?= $p_id; ?>,
					lg_filter: '<?= $lg_filter ?>',
					last_time: last_time,
					s_date_project: '<?= $s_date_project; ?>',
					f_date_project: '<?= $f_date_project; ?>',
					s_date: s_date,
					f_date: f_date,
					res_id: res_id,
					r_type: r_type,
					sentiment: sentiment,
					place: place,
					place_id: place_id,
					category_id: category_id
				},
				type: "GET",
				success: function(data) {
					if (parseInt(data) > 0) {
						$("#check_update_block span").html(data);
						$("#check_update_block").css('display', 'block');
					}
				}
			});
		}

		function update_after_check() {
			var sentiment = $("#news_sentiment").val();
			if (sentiment == 'позитив') sentiment = '1';
			if (sentiment == 'негатив') sentiment = '2';
			if (sentiment == 'нейтрал') sentiment = '3';
			var place = $("#news_place").val();
			var place_id = $("#news_place_id").val();
			var s_date = $("#news_s_date").val();
			var f_date = $("#news_f_date").val();
			var s_time = $("#news_s_time").val();
			var f_time = $("#news_f_time").val();
			var res_id = $("#news_res_id").val();
			var r_type = $("#news_r_type").val();
			var category_id = $("#news_category_id").val();
			get_news(1, '<?= $type_news ?>', s_date, f_date, s_time, f_time, res_id);
		}
	</script>

	<!-- Новая версия async functions -->
	<script>
		async function doAjax_getNews({
			type_news,
			page,
			s_date,
			f_date,
			s_time,
			f_time,
			res_id,
			sentiment,
			place,
			place_id
		}) {
			var result;
			try {
				result = await $.ajax({
					url: "<?= $lang ?>/news",
					data: {
						p_id: <?= $p_id; ?>,
						lg_filter: '<?= $lg_filter ?>',
						type_news: type_news,
						page: page,
						s_date: s_date,
						f_date: f_date,
						s_time: s_time,
						f_time: f_time,
						res_id: res_id,
						sentiment: sentiment,
						place: place,
						place_id: place_id,
					},
					type: "GET"
				});

				return result;
			} catch (error) {
				console.error(error);
			}
		}
	</script>

	<script>
		window.onload = function() {
			$.when(
				social_publications_count(<?= $p_id ?>, '<?= $type_news ?>', '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>'),

				get_news(<?= $p ?>, '<?= $type_news ?>', '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>),

				get_dynamic(<?= $p_id ?>, '<?= $type_news ?>', 'date', '<?= $s_date ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>'),

				sentiments_count(<?= $p_id ?>, '<?= $type_news ?>', '<?= $s_date; ?>', '<?= $f_date ?>', '<?= $s_time ?>', '<?= $f_time ?>', <?= $res_id ?>, '<?= $sentiment ?>', '<?= $place ?>', '<?= $place_id ?>')
			).then(function(result1, result2) {
				$('#project_news').css('visibility', 'visible');
				$('#block_graphs').css('visibility', 'visible');
				$('#block_filters').css('visibility', 'visible');
				<? if ($project['appender_status'] == 1 || $project['appender_status'] == 2) { ?>
					setInterval(function() {
						check_feed_news();
					}, 60000);
				<? } ?>
			}).then(document_ready)
		}

		function scroll_to_top() {
			$(".block_overview").animate({
				scrollTop: $(".block_center").offset().top
			}, 1000);
		}
	</script>

<? } elseif ($project['status'] == 'finished with error') { ?>
	<div class="wrapper wrapper-content p-0" id="imas-tape">
		<script>
			window.onload = function() {
				swal({
					title: '<? echo Yii::t('common', 'Ошибка при сборе данных!'); ?>',
					text: '<? echo Yii::t('common', 'Измените данные по проекту в настройке проекта'); ?>',
					type: 'error',
					confirmButtonColor: "#f27474",
					confirmButtonText: '<? echo Yii::t('common', 'Перейти в настройки'); ?>',
				}, function() {
					window.location.href = "settings?id=<?= $p_id ?>";
				});
			}
		</script>
	</div>
<? } else { ?>
	<div class="sidebar-content">
		<div class="col-lg-12 p-0 project-none-block-imas">
			<div class="project-process-block-imas sweet-alert showSweetAlert visible" data-animation="pop" data-timer="null" style="display: block; margin-top: -169px;">
				<div class="sa-icon sa-warning pulseWarning" style="display: block;">
					<span class="sa-body pulseWarningIns"></span>
					<span class="sa-dot pulseWarningIns"></span>
				</div>
				<h1><? echo Yii::t('common', 'Идёт сбор данных по проекту!'); ?></h1>
				<div class="col-lg-12 sk-loading">
					<div class="sk-spinner sk-spinner-wave">
						<div class="sk-rect1"></div>
						<div class="sk-rect2"></div>
						<div class="sk-rect3"></div>
						<div class="sk-rect4"></div>
						<div class="sk-rect5"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
<? } ?>