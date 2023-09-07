import paramiko
import time
import re
# from vdom import check_failed_before

def vdom_connection(host, username, password):

    # Crear una instancia SSHClient de Paramiko
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Conectar al dispositivo
    client.connect(hostname=host, port=2221, username=username, password=password)

    # Abrir un canal SSH
    channel = client.invoke_shell()

    # Enviar el comando 'config vdom'
    channel.send("config vdom\n")
    time.sleep(1)  # Esperar para que el comando se procese

    # Enviar otros comandos dentro del contexto 'config vdom'
    commands = [
        "edit root\n",
        "diagnose sys sdwan health-check Check_Internet\n",
        "exit\n"  # Salir del contexto 'config vdom'
    ]

    for command in commands:
        channel.send(command)
        time.sleep(1)  # Esperar para que el comando se procese

    # Recopilar la salida
    output = ""
    while channel.recv_ready():
        output += channel.recv(1024).decode('utf-8')

    # Cerrar el canal y la conexión
    channel.close()
    client.close()
    print(output)
    
    # Analizar la salida con regex
    pattern = r'Seq\(\d+ ([^\s]+)\): state\(([^)]+)\), packet-loss\(([^)]+)\) latency\(([^)]+)\), jitter\(([^)]+)\)'
    matches = re.findall(pattern, output)
    
    result = []
    
    for match in matches:
        try:
            canal = match[0]
            state = match[1]
            packet_loss = match[2]
            packet_loss = packet_loss.replace("%", "")
            latency = match[3]
            jitter = match[4]

            print(f"Canal: {canal}, State: {state}, Packet Loss: {packet_loss}%, Latency: {latency}, Jitter: {jitter}")
            
            result.append((canal, state, packet_loss, latency, jitter))
            
        except IndexError:
            continue

    if not result:
        result = [('Not Found', 'Not Found', 'Not Found', 'Not Found', 'Not Found')]

    return result

