<?php

namespace app\controllers;
use app\models\User; 
use yii\rest\ActiveController;
use Yii;
use yii\web\Controller;
use yii\helpers\Url;
use Exception;
class UserController extends LoggingController
{
    public $modelClass = 'app\models\User';
	
	
	public function actionProfile(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$result = $model->get_user_profile();
				if(isset($result[0])) return $result[0]; 
				else {
					throw new \yii\web\HttpException(404, 'No profile');
				}
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
    public function actionUpdprofile(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$key=Yii::$app->request->get('key');
				$value=Yii::$app->request->get('value');
				$res = $model->update_profile($key,$value);
				return $res;
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	public function actionGetall(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$result = $model->get_all_users();
				return $result; 
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	// Оптимизирован
	// Проверка email на присутствие в БД
	public function actionCheckemail(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$email=Yii::$app->request->get('email');
				$user_id=Yii::$app->request->get('user_id');
				
				$result = $model->check_email_users($email, $user_id);
				return $result; 
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	// Оптимизирован
	// Проверка username на присутствие в БД
	public function actionCheckusername(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$username=Yii::$app->request->get('username');
				$user_id=Yii::$app->request->get('user_id');
				
				$result = $model->check_username_users($username, $user_id);
				return $result; 
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	// Оптимизирован
	public function actionGetone(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$user_id=Yii::$app->request->get('user_id');
				$result = $model->get_one_user($user_id);
				return $result; 
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	// Оптимизирован
	public function actionCreateuser(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {				
				$sername=Yii::$app->request->get('sername');
				$name=Yii::$app->request->get('name');
				$company=Yii::$app->request->get('company');
				
				$email=Yii::$app->request->get('email');
				$phone=Yii::$app->request->get('phone');
				$telegram_name=Yii::$app->request->get('telegram_name');
				
				$username=Yii::$app->request->get('username');
				$password=Yii::$app->request->get('password');
				$role_name=Yii::$app->request->get('role_name');
				
				$session_time=Yii::$app->request->get('session_time');
				
				
				$password_hash=Yii::$app->getSecurity()->generatePasswordHash($password);
				$res = $model->create_user($sername,$name,$company,$email,$phone,$telegram_name,$username,$password_hash,$role_name,$session_time);
				return $res;
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	// Оптимизирован
	public function actionEdituser(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$user_id=Yii::$app->request->get('user_id');
				
				$sername=Yii::$app->request->get('sername');
				$name=Yii::$app->request->get('name');
				$company=Yii::$app->request->get('company');
				
				$email=Yii::$app->request->get('email');
				$phone=Yii::$app->request->get('phone');
				$telegram_name=Yii::$app->request->get('telegram_name');
				
				$username=Yii::$app->request->get('username');
				$password=Yii::$app->request->get('password');
				$role_name=Yii::$app->request->get('role_name');
				
				$session_time=Yii::$app->request->get('session_time');
				
				if($password!='') $password_hash=Yii::$app->getSecurity()->generatePasswordHash($password);
				else $password_hash='';
				
				$res = $model->update_user($user_id,$sername,$name,$company,$email,$phone,$telegram_name,$username,$password_hash,$role_name,$session_time);
				return $res;
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}
	
	public function actionUpdateprofileuser(){
		if (!empty($_GET)) {
			$model = new $this->modelClass;
			try {
				$user_id=Yii::$app->request->get('user_id');
				$profile_company=Yii::$app->request->get('profile_company');
				$profile_sername=Yii::$app->request->get('profile_sername');
				$profile_name=Yii::$app->request->get('profile_name');
				$user_email=Yii::$app->request->get('user_email');
				$telegram_name=Yii::$app->request->get('telegram_name');
				$username=Yii::$app->request->get('username');
				$user_password=Yii::$app->request->get('user_password');
				$profile_phone=Yii::$app->request->get('profile_phone');
					
				if($user_password != '') $user_password_hash = Yii::$app->getSecurity()->generatePasswordHash($user_password);
				else $user_password_hash = $user_password;
				
				$res = $model -> update_user_profile($user_id, $profile_company, $profile_sername, $profile_name, $user_email, $telegram_name, $username, $user_password_hash, $profile_phone);
				return $res;
			} catch (Exception $ex) {
				throw new \yii\web\HttpException(500, 'Internal server error');
			}
		} else {
			throw new \yii\web\HttpException(400, 'There are no query string');
		}
	}

	// v_M5
	public function actionToggle_user(){
		$model = new $this->modelClass;
		$user_id = (int) Yii::$app->request->get('user_id');
		if($model->does_exist_user($user_id)){
			if($model->is_user_disabled($user_id)){
				return $model->turn_on_user($user_id);
			}
			// Отключение проектов, который пользователь создал сам
			$project_list = $model->get_projects_of_user($user_id);
			if(count($project_list) > 0){
				$string_project_ids = $model->create_string_frm_array($project_list,'id');
				// Проверить есть ли поделенные пользователи
				$shared_users = $model->get_shared_users($string_project_ids,$user_id);
				// Если поделенных пользователей нет, то отключай все проекты
				if(count($shared_users)==0){
					$model->turn_off_project($user_id,$string_project_ids);
				}
				// Если есть поделенные пользователи 
				else{
					// Проверить отключенные ли пользователи
					$string_shared_users_ids = $model->create_uniq_string_frm_array($shared_users,'user_id');
					$are_all_disabled = $model->check_all_users_disabled($string_shared_users_ids);
					// Если все отключены, то отключай все проекты
					if($are_all_disabled == true){
						$model->turn_off_project($user_id,$string_project_ids);
					}
					else{
						// Если не все отключены, найти проекты, в которых пользователи АКТИВНЫ
						$array_able_users = $model->create_array_with_key($model->get_abled_users($string_shared_users_ids),'user_id');
						// Получить id проектов, в которых нет включенных пользователей
						$sorted_shared_users = $model->create_associal_array_lists($shared_users,'user_id','project_id');
						$projects_ids_for_turn_off = $model->remove_values_with_keys($sorted_shared_users,$array_able_users);
						// Если список не пустой, добавить id в список проектов для отключения
						if(count($projects_ids_for_turn_off)>0){
							$project_id_of_disabled_users =  join(",",$projects_ids_for_turn_off);
							// Получить список неподеленных id проектов
							$unshared_project_ids = $model->create_uniq_string_frm_array($model->get_unshared_projects($string_project_ids,$user_id),'project_id');
							$string_project_ids_for_disabling = "{$project_id_of_disabled_users},{$unshared_project_ids}";
						}
						else{
							$unshared_project_ids = $model->create_uniq_string_frm_array($model->get_unshared_projects($string_project_ids,$user_id),'project_id');
							$string_project_ids_for_disabling = "{$unshared_project_ids}";
						}
						$model->turn_off_project($user_id,$string_project_ids_for_disabling);
					}
				}
			}

			// Отключение проектов, которые пользователь не создовал, но остались у него
			// Получить все id проектов, которые пользователь имеет
			$user_related_projects_id = $model->get_related_project_id($user_id);
			if(count($user_related_projects_id)>0){
				$related_p_id_str = $model->create_uniq_string_frm_array($user_related_projects_id,'project_id');
				// Получить список проектов, где пользователи отключены
				$p_id_of_disabled_user =  $model->find_p_id_of_disabled_user($user_id,$related_p_id_str);
				// Если есть отключенные пользователи, которые имееют тот же проект
				if(count($p_id_of_disabled_user)>0){
					$possible_to_disable_projects_id =  $model->create_uniq_string_frm_array($p_id_of_disabled_user,'project_id');
					// Получить id проектов, где есть неотключеные пользователи
					$p_id_with_avaiable_user = $model->get_able_users_with_projects($possible_to_disable_projects_id,$user_id);
					if(count($p_id_with_avaiable_user)>0){
						$p_id_with_avaiable_user = $model->create_uniq_string_frm_array($p_id_with_avaiable_user,'project_id');
						// Убираем id пользователей, у которых пользователи не отключены
						$turn_off_project_ids = join(",",$model->remove_part_ids($possible_to_disable_projects_id,$p_id_with_avaiable_user));
						if(strlen($turn_off_project_ids)>0)
							$model->turn_off_project($user_id,$turn_off_project_ids);
						// $model->turn_off_project($turn_off_project_ids);
					}
					else{
						$model->turn_off_project($user_id,$possible_to_disable_projects_id);	
					}
				}
				// Отключить проекты, которые остались только у него
				$p_id_with_only_one_user = $model->get_p_id_with_only_one_user($user_id);
				if(count($p_id_with_only_one_user)>0){
					$model->turn_off_project($user_id,$model->create_uniq_string_frm_array($p_id_with_only_one_user,'project_id'));
				}
			}
			// отключение пользователя
			return $model->turn_off_user($user_id);
		};
	}

	public function actionDisabled_users(){
		$model = new $this->modelClass;
		return $model->get_disabled_users();
	}

	public function actionGet_permission_for_create_project(){
		$iUser_id = (int) Yii::$app->request->get('iUser_id');
		$numberOfProjectsCreatedByUserLessThanLimit = self::userNotExceededNumberOfCreateProjectsLimit($iUser_id);
		$projectCountLessThanLimit = self::userNotExceededNumberOfProjectsLimit($iUser_id);
		return $numberOfProjectsCreatedByUserLessThanLimit && $projectCountLessThanLimit;
	}

	private static function userNotExceededNumberOfProjectsLimit(int $iUser_id){
		$permissions = Yii::$app->authManager->getPermissionsByUser($iUser_id);
		$permissions_array=array();
		foreach($permissions as $key=>$value){
			$permissions_array[]=$key;
		}
		if(in_array('limited_users_by_the_number_of_topics', $permissions_array) == false){
			return true;
		}
		$projectCount = User::getProjectCount($iUser_id);
		return $projectCount < 10 ? true : false;
	}

	private static function userNotExceededNumberOfCreateProjectsLimit(int $userId){
		$userLimit = User::get_project_creation_limit($userId);
		$userCreateProjectsCount = User::get_user_created_projects_count($userId);
		return $userLimit == 0 || $userLimit > $userCreateProjectsCount;
	}
}