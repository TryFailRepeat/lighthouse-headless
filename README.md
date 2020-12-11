# Base Image for Frntend Analisis
Base images contains chrome headless and a loghthouse custom script
to analyze frontend statistics of a page. Parameter for lighthouse to run in
chrome headless are already set

## psi
PageSpeed Insights with reporting. (does not work on localhost) <br>
[documentation psi](https://github.com/addyosmani/psi)

    // script
    $ lighthouse-headless <url>
    // help
    $ lighthouse-headless --help

    // example if not used as template
    docker build -t lighthouse-headless ./
    docker run --rm -it lighthouse-headless /bin/sh -c 'psi http://www.unymira.com'

## lighthouse
Output is written to `./reports/report.html` as html inside the container by default. <br>
[documentation lighthouse](https://github.com/GoogleChrome/lighthouse)


    // script
    $ lighthouse-headless <url>
    // help
    $ lighthouse-headless --help

    // example if not used as template
    docker build -t lighthouse-headless ./
    docker run --rm --volume=/path/to/volume:/home/node/reports -it lighthouse-headless /bin/sh -c 'lighthouse-headless http://www.unymira.com'