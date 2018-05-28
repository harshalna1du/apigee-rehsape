print("....Entering reshapeResponse")
 try{
   print(context.getVariable("jmespathExpression"))
        if (context.getVariable("jmespathExpression")!==null)
        {    print("....processing reshapeResponse")
            var jmespathExpression=context.getVariable("jmespathExpression");
            var jmespathOutput = jmespath.search(JSON.parse(context.getVariable("inputbody")), jmespathExpression);
            context.proxyResponse.content=JSON.stringify(jmespathOutput);
        }
    
    } catch (err) 
    {
        print("....Entering error block")
        context.setVariable("response.content", "{message:\"Invalid expression expression\"}");
        context.setVariable("response.status.code", 400);
        context.setVariable("response.reason.phrase", "Bad Request");
    }

