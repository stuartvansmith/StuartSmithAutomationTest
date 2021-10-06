# Stuart Smith test framework 


## To install
```diff
  npm install
 ```

## To run tests
```
npm run test
```
## Notes
- The generated allure-report index.html can't be viewed unless served by a webserver
	I felt this was outside the scope of the test, so haven't implemented that.
- The cart page model was to be refactored to use the same inventory containers as the homepage but I ran out of time. So currently the last part of the test accesses elements directly from the test testfile which would be next on my TODO list.
