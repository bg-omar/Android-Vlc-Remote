![VLC](https://img.shields.io/badge/VLC-http--lua--remote-orange)
![angular](https://img.shields.io/badge/Angular-VLC-red)
![WAMP](https://img.shields.io/badge/WAMP-3.2.3-%23ff66ff)
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/angular.svg" />
<img height="32" width="32" color="#fff;" src="https://unpkg.com/simple-icons@v7/icons/angular.svg" />
![WAMP](https://img.shields.io/static/v1?label=<LABEL>&message=<MESSAGE>&color=<COLOR>)
##  Install Guide
 get WAMP from https://www.wampserver.com/en/download-wampserver-64bits/
--- Installation of Wampserver --- Install Wampserver in, C:\wamp or D:\wamp
````
BEFORE proceeding with the installation of Wampserver, you must ensure that certain elements are installed on your system, otherwise Wampserver will absolutely not run, and in addition, the installation will be faulty and you need to remove Wampserver BEFORE installing the elements that were missing.
Make sure you are "up to date" in the redistributable packages VC9, VC10, VC11, VC13, VC14, VC15, VC17 and VS16
See --- Visual C++

--- Install Wampserver in a folder at the root of a disk, for example C:\wamp
If you have a 64-bit Windows, you must install both 32 and 64bit versions of each VisualC++ package, even if you do not use Wampserver 64 bit.
- Verify that all VC ++ packages are installed and with the latest versions.
  To do this, use the tool: Checks VC++ packages installed
  http://wampserver.aviatechno.net/files/tools/check_vcredist.exe
````
Install VLC
edit VLC configuration
````
[lua] # Lua web interpreter
http-src=C:\Program Files\VideoLAN\VLC\lua\http
http-password=password
````

Add ports to WAMP  (right click System Tray Icon --> tools  --> add listing port) 
edit apache config (left click  System Tray Icon --> apache --> httpd.conf)

####  C:\Windows\System32\drivers\etc\hosts
```
127.0.0.1 localhost
::1 localhost
127.0.0.1	vlc
::1	vlc
127.0.0.1	pc
::1	pc
127.0.0.1	pc2
::1	pc2
```

bin/apache/apache2.4.46/wampdefineapache.conf
````
MYPORT8090 = "8090"
MYPORT8091 = "8091"
````


bin/apache/apache2.4.46/conf/httpd.conf
```
Listen 8050
Listen 0.0.0.0:80
Listen [::0]:80
Listen 0.0.0.0:${MYPORT8090}
Listen [::0]:${MYPORT8090}
Listen 0.0.0.0:${MYPORT8091}
Listen [::0]:${MYPORT8091}

Define MYPORT8090 8090
Define MYPORT8091 8091

LoadModule rewrite_module modules/mod_rewrite.so
LoadModule vhost_alias_module modules/mod_vhost_alias.so
LoadModule alias_module modules/mod_alias.so
````


### Virtual Hosts # Local VLC-remote front end
 bin/apache/apache2.4.46/conf/extra/httpd-vhosts.conf
```
<VirtualHost *:80>
    ServerName localhost
    ServerAlias localhost
    DocumentRoot "${INSTALL_DIR}/www"
    <Directory "${INSTALL_DIR}/www/">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost 192.168.1.1:80>
    ServerName vlc
    DocumentRoot "c:/wamp64/www/vlc"
    <Directory  "c:/wamp64/www/vlc/">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
````
## Local VLC lua http port 8080 received on 8090
 bin/apache/apache2.4.46/conf/extra/httpd-vhosts.conf
```
<VirtualHost 192.168.1.1:${MYPORT8090}>
    ServerName pc
    Redirect 301 / http://192.168.1.1:8080/
    DocumentRoot "c:/wamp64/www/vlc"
    <Directory  "c:/wamp64/www/vlc/">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

````
### Pc2 VLC -- send --> lua http --> 192.168.1.*:8081/ 
 192.168.1.*:8081 --> Redirected to 192.168.1.1:8091
 bin/apache/apache2.4.46/conf/extra/httpd-vhosts.conf
```
<VirtualHost 192.168.1.1:${MYPORT8091}>
    ServerName pc2
    Redirect 301 / http://192.168.1.*:8081/
    DocumentRoot "c:/wamp64/www/vlc"
    <Directory  "c:/wamp64/www/vlc/">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require local
    </Directory>
</VirtualHost>
```


### Install Angular CLI
````
npm install -g @angular/cli
npm install -g typescript
npm install --save-dev @types/jquery
npm i bootstrap@5.2.1 bootstrap-icons
````
make [@ root of Angular] proxy.conf.json
```
{
"/url/*": {
    "target": "http://localhost:5000",
    "secure": false,
    "logLevel": "debug"
},
```

Angular.json
```
"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
            "browserTarget": "frontend:build",
            "proxyConfig": "proxy.conf.json"

```

Package.json:
```
"static-2-wamp": "ng build  --configuration production  --output-path ../vlc --watch --output-hashing none",
```
