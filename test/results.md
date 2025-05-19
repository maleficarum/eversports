# Eversports test cases results


| :clock10: Start time | :hourglass: Duration |
| --- | ---: |
|19/05/2025, 2:02:16 am|1.257 s|

| | :white_check_mark: Passed | :x: Failed | :construction: Todo | :white_circle: Total |
| --- | ---: | ---: | ---:| ---: |
|Test Suites|1|0|-|1|
|Tests|5|0|0|5|

## test/main.test.ts [[link](https://github.com/maleficarum/eversports/blob/2301420538749256af199b3614be4cdf7d96bdc0/test/main.test.ts)]

5 passed, 0 failed, 0 todo, done in 1.181 s

- :white_check_mark: Test membership creation rules
  - :white_check_mark: Cash method validation
    - :white_check_mark: should validate recurring price gt 100 for cash mayment method
  - :white_check_mark: Monthly billing interval validation
    - :white_check_mark: should validate billing period gt 12 for monthly billing interval
    - :white_check_mark: should validate billing period lt 6 for monthly billing interval
  - :white_check_mark: Yearly billing interval validation
    - :white_check_mark: should validate billing period gt 10 years
    - :white_check_mark: should validate billing period lt 3 years

