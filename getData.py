import requests, json, sys

email = sys.argv[1]
password = sys.argv[2]

url = 'https://www.services.renault-ze.com/api/user/login'
header =  {"Content-Type": "application/json;charset=utf-8"}
task = {"username":email,"password":password}
resp_auth = requests.post(url, json=task, headers=header)
if resp_auth.status_code != 200:
    # This means something went wrong.
    print(resp_auth.status_code)

data = resp_auth.json()
token = data['token']
vin = data['user']['associated_vehicles'][0]['VIN']


#battery
url = "https://www.services.renault-ze.com/api/vehicle/{}/battery".format(vin)
header =  {"Authorization": "Bearer {}".format(token)}
resp_bat = requests.get(url, headers=header)

if resp_bat.status_code != 200:
    # This means something went wrong.
    print(resp_bat.status_code)

data = resp_bat.json()
charge = str(data['charge_level'])
range = str(data['remaining_range'])
charging = str(data['charging'])
print(charge+","+range+","+charging)