# Eversports test cases results


| :clock10: Start time | :hourglass: Duration |
| --- | ---: |
|18/05/2025, 10:15:26 pm|1.38 s|

| | :white_check_mark: Passed | :x: Failed | :construction: Todo | :white_circle: Total |
| --- | ---: | ---: | ---:| ---: |
|Test Suites|1|0|-|1|
|Tests|5|0|0|5|

## test/main.test.ts [[link](https://github.com/maleficarum/eversports/blob/e7c62f407fc9dced06518862a26367f570535bbb/test/main.test.ts)]

5 passed, 0 failed, 0 todo, done in 1.309 s

- :white_check_mark: Test membership creation rules
  - :white_check_mark: Cash method validation
    - :white_check_mark: should validate recurring price gt 100 for cash mayment method
  - :white_check_mark: Monthly billing interval validation
    - :white_check_mark: should validate billing period gt 12 for monthly billing interval
    - :white_check_mark: should validate billing period lt 6 for monthly billing interval
  - :white_check_mark: Yearly billing interval validation
    - :white_check_mark: should validate billing period gt 10 years
    - :white_check_mark: should validate billing period lt 3 years

