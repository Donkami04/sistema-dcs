import pymssql

server = "10.117.112.25"
user = "lundinmining\\alvaro.pardo"
password = "Mexico1946."
database = "MLCOperational"

def get_data_dispatch(eqmt):
    try:
        conn = pymssql.connect(server, user, password, database)
        cursor = conn.cursor()
        cursor.execute("SELECT TOP (1000) [shiftdate],[shift#] ,[endtime] ,[unit] ,[eqmt] ,[status] ,[name] ,[hora] ,[operatorname] FROM [MLCOperational].[dbo].[status_equipos]")
        
        all_data = []
        for row in cursor:  
            data = list(row)
            all_data.append(data)
        
        for data_device in all_data:
            if data_device[4] == eqmt:
                status_dispatch = f'{data_device[5]}-{data_device[6]}'
                operador = data_device[8]
                return status_dispatch, operador

        status_dispatch = 'Not Found'
        operador = 'Not Found'
        conn.close()
        return status_dispatch, operador
        
    except Exception as e:
        print(f"error {e}")
        status_dispatch = 'Not Found'
        operador = 'Not Found'
        return status_dispatch, operador

# get_data_dispatch('P18')