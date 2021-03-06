# freeport-async

Finds an available port for your application to use.
You can specify a range where to look for an available port.
And can also find a range of available ports for you to use.
You can also be used to test to see if a given port is available.

All functions are async and return Promises.


Usage:
```js
    var freeportAsync = require('freeport-async');

    var portICanUse = await freeportAsync();

    var portICanUseOnInterface = await freeportAsync(undefined, '127.0.0.1');

    var portIn9000Range = await freeportAsync(9000);

    var portIn9000RangeOnInterface = await freeportAsync(9000, '192.168.1.43');

    var isPort5000Available = await freeportAsync.availableAsync(5000);

    var isPort5000AvailableOnInterface = await freeportAsync.availableAsync(5000, '10.0.0.3');

    var listOf5ConsecutiveAvailablePorts = await freeportAsync.rangeAsync(5);

    var listOf5ConsecutiveAvailablePortsOnInterface = await freeportAsync.rangeAsync(5, '::1');

    var freeRangeIn12000Range = await freeportAsync.rangeAsync(3, 12000);

    var freeRangeIn12000RangeOnInterface = await freeportAsync.rangeAsync(3, 12000, 'my.host.name');

```

Note that this code just finds available ports, but doesn't reserve them in any way.
This means that if you have other code that might be looking for a port in the same range at the same time, you could run into issues.
Also, if you call `freeportAsync` twice in a row, it will often return the same port number twice. If you want to find two (or more) ports you can use, you need to call `freeportAsync.rangeAsync(<number-of-ports>, [startSearchFrom])`.


See also https://gist.github.com/mikeal/1840641

