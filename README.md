# apigee-rehsape
Reshape / filter apigee response

## Summary

There's often a need to filter / restrucutre JSON response. This API proxy accepts a [JMESPath](http://jmespath.org/) expression in the query string and input JSON (to be reshaped) in the content body.

The response is JSON post JMESPath processing on the input in the body.

Adding JMESPath Reshape to your API makes response flexible  and take away the need of filtering data (if your application can afford the slight impact on response time). I've found this approach useful for clients that use the API data for data science or data visualization projects.

## Installation 

Import the proxy bundle zip file ino Apigee.

## Example

### Request
```
curl --request POST \
  --url 'https://<Your apigee domain>/reshape?jmespathExpression=locations%5B%3Fstate%20%3D%3D%20'\''WA'\''%5D.name%20%7C%20sort(%40)%20%7C%20%7BWashingtonCities%3A%20join('\''%2C%20'\''%2C%20%40)%7D' \
  --header 'content-type: application/json' \
  --data '{
  "locations": [
    {"name": "Seattle", "state": "WA"},
    {"name": "New York", "state": "NY"},
    {"name": "Bellevue", "state": "WA"},
    {"name": "Olympia", "state": "WA"}
  ]
}'
```
### Response
```
{
	"WashingtonCities": "Bellevue, Olympia, Seattle"
}
```
## Tips on integrating with your APIS

* Use the latest JMESPath js library that can be found here https://github.com/jmespath/jmespath.js.
* Extract the query params and the JMESPath expression in the proxy endpoint preflow.
* Use the javascript callout policy in the target response to intercept the target response, reshape it using JMESpath and set it again into context.proxyResponse.content.
* Use try /catch to trap errors from the jmespatj.js library




