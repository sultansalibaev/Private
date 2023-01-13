import json
import configparser

config = configparser.ConfigParser()
config.read('connections.ini')


class Settings:
    FRONT_DB_INFO = json.loads(config['CONNECTIONS_INFO']['FRONT_DB'])
