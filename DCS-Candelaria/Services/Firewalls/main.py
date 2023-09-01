import mysql.connector, time, sched, datetime, os, re, traceback, logging
from netmiko import ConnectHandler
from dotenv import load_dotenv
from config import database
from vdom import vdom_connection

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)

load_dotenv()
env = os.getenv('ENVIRONMENT')

if env == 'local':
    mydb = mysql.connector.connect(
        host=database['local']['DB_HOST'],
        user=database['local']['DB_USER'],
        password=database['local']['DB_PASSWORD'],
        database=database['local']['DB_DATABASE']
    )
else:
    mydb = mysql.connector.connect(
        host=database['production']['DB_HOST'],
        user=database['production']['DB_USER'],
        password=database['production']['DB_PASSWORD'],
        database=database['production']['DB_DATABASE']
    )

cursor = mydb.cursor()


def fw_status():
    try:
        USER = os.getenv('NETMIKO_USER')
        PASSWORD = os.getenv('NETMIKO_PASSWORD')
        query = "SELECT * FROM dcs.data_firewalls"
        cursor.execute(query)
        column_names = [column[0] for column in cursor.description]

        # Convertir los resultados a una lista de diccionarios
        firewall_list = []
        for row in cursor:
            row_dict = {}
            for i in range(len(column_names)):
                row_dict[column_names[i]] = row[i]
            firewall_list.append(row_dict)

        for fw in firewall_list:
            now = datetime.datetime.now()
            fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
            fecha_y_hora = str(fecha_y_hora)
            
            host = fw.get('ip')
            name = fw.get('name')
            num_connections = fw.get('num_conn')
            vdom = fw.get('vdom')
            logging.info(f'Corriendo : {host}')
            
            net_connect = None
            try:
                if vdom == 'true':
                    canal, state, packet_loss, latency, jitter = vdom_connection(host, USER, PASSWORD)
                    failed_before = check_failed_before(name)
                    query = "INSERT INTO dcs.firewalls (`fw`, `canal`, `state`, `packet_loss`, `latency`, `jitter`, `failed_before`, `datetime`)"
                    value = f"VALUES ('{name}', '{canal}', '{state}', '{packet_loss}', '{latency}', '{jitter}', '{failed_before}', '{fecha_y_hora}')"
                    cursor.execute(query + value)
                    mydb.commit()
                    
                else:
                    network_device_list = {
                        "host": host,
                        "username": USER,
                        "password": PASSWORD,
                        "device_type": "fortinet",
                        "port": 2221,
                        "timeout": 180,
                    }

                    net_connect = ConnectHandler(**network_device_list)
                    output = net_connect.send_command("diagnose sys sdwan health-check Check_Internet")
                    logging.info(output)
                    net_connect.disconnect()
                    
                    if 'Health Check' in output:
                        pattern = r'Seq\((\d+)\s+([^\s:)]+)\): state\(([^)]+)\), packet-loss\(([^)]+)\) latency\(([^)]+)\), jitter\(([^)]+)\)'
                        matches = re.findall(pattern, output)
                        for match in matches:
                            try:
                                canal = match[1]
                                state = match[2]
                                packet_loss = match[3]
                                packet_loss = packet_loss.replace("%", "")
                                latency = match[4]
                                jitter = match[5]
                                failed_before = check_failed_before(name)
                                
                                query = "INSERT INTO dcs.firewalls (`fw`, `canal`, `state`, `packet_loss`, `latency`, `jitter`, `failed_before`, `datetime`)"
                                value = f"VALUES ('{name}', '{canal}', '{state}', '{packet_loss}', '{latency}', '{jitter}', '{failed_before}', '{fecha_y_hora}')"
                                cursor.execute(query + value)
                                mydb.commit()

                            except:
                                logging.error(f"Error en la expresion regular Health Check - FW {host}")
                                logging.error(e)
                                for _ in range(num_connections):
                                    save_bd_error(name, fecha_y_hora)
                                
                    else:
                        logging.error(f"No se encontro las palabras 'Health Check - FW {host}")
                        for _ in range(num_connections):
                            save_bd_error(name, fecha_y_hora)
                                    
            except Exception as e:
                if net_connect:
                    net_connect.disconnect()
                logging.error(f"Error en el FW {host}")
                logging.error(e)
                
                for _ in range(num_connections):
                    save_bd_error(name, fecha_y_hora)
                    
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO dcs.fechas_consultas_fw (`ultima_consulta`, `estado`) VALUES ('{fecha_y_hora}', 'OK')")
        mydb.commit()
        cursor.close()
    
    except Exception as e:
        if net_connect:
            net_connect.disconnect()
        logging.error(f"Error GENERAL {host}")
        logging.error(e)
        
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        
        cursor.execute(f"INSERT INTO dcs.fechas_consultas_fw (`ultima_consulta`, `estado`) VALUES ('{fecha_y_hora}', 'OK')")
        mydb.commit()
        cursor.close()
        


def save_bd_error(name, fecha_y_hora):
    canal = 'Not Found'
    state = 'Not Found'
    packet_loss = 'Not Found'
    latency = 'Not Found'
    jitter = 'Not Found'
    failed_before = check_failed_before(name)

    
    
    query = "INSERT INTO dcs.firewalls (`fw`, `canal`, `state`, `packet_loss`, `latency`, `jitter`, `failed_before`, `datetime`)"
    value = f"VALUES ('{name}', '{canal}', '{state}', '{packet_loss}', '{latency}', '{jitter}', '{failed_before}','{fecha_y_hora}')"
    cursor.execute(query + value)
    mydb.commit()
    
    
def check_failed_before(name):
    try:
        query = f"SELECT * FROM dcs.firewalls WHERE fw = '{name}' AND state = 'down' AND datetime >= NOW() - INTERVAL 24 HOUR ORDER BY datetime DESC LIMIT 1"
        cursor.execute(query)
        row = cursor.fetchone()
        if row:
            return 'Si'
        else:
            return 'No'
            
    except Exception as e:
        logging.error(e)
        logging.error(f"Error en la consulta a la BD check_failed_before {name}")
        return 'Error'
    

fw_status()


# def bucle(scheduler):
#     scheduler.enter(300, 1, bucle, (scheduler,))

# if __name__ == '__main__':
#     s = sched.scheduler(time.time, time.sleep)
#     s.enter(0, 1, bucle, (s,))
    # s.run()
