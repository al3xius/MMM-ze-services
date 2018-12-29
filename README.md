# MMM-ze-services

This is a module for the [MagicMirror²](https://github.com/al3xius/MMM-ze-services).

This module displayes the remaining charge and range of your Renault ZOE.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-ze-services',
            config: {
                email: "example@example.com",
		password: "Password",
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `email`          | *Required* Your email address used to log into zeServices.
| `password`       | *Required* Your password used to log into zeServices.
