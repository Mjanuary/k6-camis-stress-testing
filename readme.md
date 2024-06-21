### LOGIN

---

## Using graphana dashboard

sign in into graphana dashboard and get the key and use the key (example below)

### 1. Sing in

```
k6 login cloud --token 70e88aabefb3731338c57b539f371c7f050cf4aa2031b2756d5c9045f7e35794
```

### 2. Run the commands

```
k6 run --out cloud [testing-file]
```

###### Example:

```
k6 run --out cloud schools-optimized.js
```

---

### soak testing:

check on how the application behave under a certain load

```
k6 run --out cloud soak-test.js
```

---

# Files

### 1. schools-optimized.js:

this file will test the app by signing in and navigate to the school page then end the process

- use this file for testing with many users

```
 k6 run schools-optimized.js
```

---

### 2. schools-screenshots.js:

this file will test the app by signing in and navigate to the school page then end the process

- this app will be taking screenshots as it navigate and store the screenshot in the screenshots folder
- DO NOT USE THIS FILE FOR TESTING WITH MULTI-USER

```
 k6 run schools-screenshots.js
```

---

### 2. schools-screenshots.js:
# k6-camis-stress-testing
