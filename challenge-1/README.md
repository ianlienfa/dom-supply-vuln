This ctf problem is about supply chain attack,
the player should figure out the underlying library used
then perform an XSS attack correspondingly.

Currently it could be build and run successfully with
```
docker build --build-arg FLAG=flag{sadkjfhkjsfa} . -t supply-vuln-chrome
```
```
docker run --rm -p 8000:8000 supply-vuln-chrome                           
```
