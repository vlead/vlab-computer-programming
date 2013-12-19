
window.model = {
    fact: 1,
    input: 0,
    nextNum: 1,
    init: function() {
    	this.result	= 1

    }
    computeNextFact: function() {

    	result = result * nextNum
    	nextNum--
    }
}

window.view = {
	onload: function() {
		this.activateEvents();
	},

	activateEvents: function() {

	},

	changeClass: function(id, className)
	{
		document.getElementById(id).className = className
	}
}


window.onload = function() { view.onload() }


function mySwitchFunction(x, y)
 {
 	document.getElementById(x).style.display="none";
 	document.getElementById(y).style.display="block"; 
 }



function disableButton(buttonId)
{
	document.getElementById(buttonId).disabled = true;
}

function enableButton(buttonId)
{
	document.getElementById(buttonId).disabled = false;
}

function getLastHighlightedDiv()
{
	var findClass = document.getElementsByClassName('showDivInRed')
	return findClass[0]
}

function getNextDivToHighlight(lastHighlightedDiv)
{
	var next = lastHighlightedDiv.nextSibling
	next = next.nextSibling
	return next
}

function jumpToExitLoop(lastHighlightedDiv)
{
	var next = lastHighlightedDiv.nextSibling
	for( i = 1 ; i <= 39 ; i++ )
		{
			next = next.nextSibling
		} 
	return next
}

function goToForLoopHead(lastHighlightedDiv)
{
	var previous = lastHighlightedDiv.previousSibling
		for( i = 1 ; i <= 5 ; i++ )
		{
			previous = previous.previousSibling
		}
		
	return previous
}

function goToWhileLoopHead(lastHighlightedDiv)
{
	var previous = lastHighlightedDiv.previousSibling
	for( i = 1 ; i <= 7 ; i++ )
	{
		previous = previous.previousSibling
	} 
	
	return previous
}

function addClickEvent(id, method)
{
	var element = document.getElementById(id)
	element.addEventListener('click',method,false)
}

function addEventOnInputBox(id, method)
{
	var element = document.getElementById(id)
	element.addEventListener('change', method, false)
}

function activateEvents()
{
	addClickEvent('btnNext',nextBtn)
	addClickEvent('btnStart',startBtn)
	addClickEvent('nestedStartBtn',startBtnNested)
	addClickEvent('nestedNextBtn',nextBtnNested)
	addClickEvent('nestedLoop',function() { mySwitchFunction('div1-body','nested');})
	addClickEvent('localVariables',function() { mySwitchFunction('div1-body','show');})
	addClickEvent('initialize',function() { mySwitchFunction('show','div1-body');})
	addClickEvent('simpleLoop',function() { mySwitchFunction('nested','div1-body');})
	addEventOnInputBox('inputValue',getInput)
	addEventOnInputBox('nestedInput',getNestedInput)
}

function getSelectedLoop()
{
	var list_of_loop = document.getElementById('loop_list')
	var selected_loop = list_of_loop.options[list_of_loop.selectedIndex].text
	return selected_loop
}

function getInput()
{
	var inputValue = document.getElementById("inputValue").value
	window.inp = Number(inputValue)
}

function getNestedInput()
{
	var inputValue = document.getElementById("nestedInput").value
	window.nestedInp = Number(inputValue)
}

function startBtn()
{
	document.getElementById('div221').innerHTML+="<br>"
	var selected_loop = getSelectedLoop()
	var inputValue = document.getElementById("inputValue").value

	if (selected_loop === "for" && inputValue !== "" && !isNaN(window.inp))
	{
	 	var node = document.getElementById("forLoopContent")
		var allChild = node.childNodes

	 		for( i = 1 ; i < allChild.length ; i+=2)	
			{
				if( allChild[i].id === 'codeContentFor1')
				changeClass(allChild[i].id,'showDivInRed')

				else
				changeClass(allChild[i].id,"showDiv")	
			}
	}
	if (selected_loop === "while" && inputValue !== "" && !isNaN(window.inp))
	{
	 	var node = document.getElementById("whileLoopContent");
		var allChild = node.childNodes

	 		for( i = 1 ; i < allChild.length ; i+=2)	
			{
				if( allChild[i].id === 'codeContentWhile1')
				changeClass(allChild[i].id,'showDivInRed')

				else
				changeClass(allChild[i].id,"showDiv")	
			}
	}
	if (selected_loop === "do-while" && inputValue !== "" && !isNaN(window.inp))
	{
	 	var node = document.getElementById("dowhileLoopContent");
		var allChild = node.childNodes

	 		for( i = 1 ; i < allChild.length ; i+=2)	
			{
				if( allChild[i].id === 'codeContentDoWhile1')
				changeClass(allChild[i].id,'showDivInRed')

				else
				changeClass(allChild[i].id,"showDiv")	
			}
	}
			disableButton('btnStart')
	 		enableButton('btnNext')
}	 

function nextBtn()
{
	var selected_loop = getSelectedLoop()
	var lastRedDiv = getLastHighlightedDiv()
	var nextRedDiv = getNextDivToHighlight(lastRedDiv)
	
	var i = window.inp
	if( window.inp === 0 )
	{	
		if( lastRedDiv.id !== 'codeContentFor6' && lastRedDiv.id !== 'codeContentWhile6' && lastRedDiv.id !== 'codeContentDoWhile7' )
		{
			changeClass(lastRedDiv.id,'showDiv')
			changeClass(nextRedDiv.id,'showDivInRed')
		}	
		else
		{	
			alert('code running is over')
			disableButton('btnNext')
			enableButton('btnStart')
			changeClass(lastRedDiv.id,'showDiv')
		}
	}	
	else
	{	
		if( lastRedDiv.id === 'codeContentFor4' || lastRedDiv.id === 'codeContentWhile4' || lastRedDiv.id === 'codeContentDoWhile5')
		{
			nextRedDiv = getNextDivToHighlight(nextRedDiv)
			nextRedDiv = getNextDivToHighlight(nextRedDiv)
			changeClass(lastRedDiv.id,'showDiv')
			changeClass(nextRedDiv.id,'showDivInRed')
		}
		else
		{
			if (lastRedDiv.id === 'forLoopTail')
			{	
				for( i = window.inp ; i >= 1 ; i--)
				{
					var disp = fact
					fact = fact*i
					break
				}
				nextRedDiv = goToForLoopHead(lastRedDiv)
				changeClass(lastRedDiv.id,'showDiv')
				changeClass(nextRedDiv.id,'showDivInRed')
				document.getElementById('div221').innerHTML+=disp+" "+"*"+" "+window.inp+"="+" "+fact+"<br>"
				document.getElementById("localVariablesI").innerHTML= "i="+" "+" "+" "+window.inp
				document.getElementById("localVariablesFact").innerHTML= "fact="+" "+" "+" "+fact
				window.inp--
			}	
			if (lastRedDiv.id === 'whileLoopTail')
			{	
				while( i >= 1 )
				{
					var disp = fact
					fact = fact*i
					i--
					break
				}	
				nextRedDiv = goToWhileLoopHead(lastRedDiv)
				changeClass(lastRedDiv.id,'showDiv')
				changeClass(nextRedDiv.id,'showDivInRed')
				document.getElementById('div221').innerHTML+=disp+" "+"*"+" "+window.inp+"="+" "+fact+"<br>"
				document.getElementById("localVariablesI").innerHTML= "i="+" "+" "+" "+window.inp
				document.getElementById("localVariablesFact").innerHTML= "fact="+" "+" "+" "+fact
				window.inp--
			}	
			if (lastRedDiv.id === 'dowhileLoopTail')
			{	
				do 
				{
					var disp = fact
					fact = fact*i
					i--
					break
				}while( i >= 1)

				nextRedDiv = goToWhileLoopHead(lastRedDiv)
				changeClass(lastRedDiv.id,'showDiv')
				changeClass(nextRedDiv.id,'showDivInRed')
				document.getElementById('div221').innerHTML+=disp+" "+"*"+" "+window.inp+"="+" "+fact+"<br>"
				document.getElementById("localVariablesI").innerHTML= "i="+" "+" "+" "+window.inp
				document.getElementById("localVariablesFact").innerHTML= "fact="+" "+" "+" "+fact
				window.inp--
			}	
			if( window.inp < 1 )
			{
				alert("code running is over")
				changeClass(nextRedDiv.id,'showDiv')
				disableButton('btnNext')
	 			enableButton('btnStart')
			}	
				
			
			else
			{	
				changeClass(lastRedDiv.id,'showDiv')
				changeClass(nextRedDiv.id,'showDivInRed')
			}
		}
		
	}
}

function startBtnNested()
{
	var inputValue = document.getElementById("nestedInput").value
	if ( inputValue !== "" && !isNaN(window.nestedInp))
	{
		var node = document.getElementById("nestedLoopContent");
		var allChild = node.childNodes

	 		for( i = 1 ; i < allChild.length ; i+=2)	
			{
				if( allChild[i].id === 'codeContentNested1')
				changeClass(allChild[i].id,'showDivInRed')

				else
				changeClass(allChild[i].id,"showDiv")	
			}
	}	
}	

function nextBtnNested()
{
	document.getElementById('div221').innerHTML+="<br>"
	var lastRedDiv = getLastHighlightedDiv()
	var nextRedDiv = getNextDivToHighlight(lastRedDiv)
	
	if ( window.nestedInp === 0 )
	{
		if( lastRedDiv.id !== 'codeContentNested4' )
		{
			changeClass(lastRedDiv.id,'showDiv')
			changeClass(nextRedDiv.id,'showDivInRed')
		}	
		else
		{	
			nextRedDiv = jumpToExitLoop(lastRedDiv)	
			changeClass(nextRedDiv.id,'showDivInRed')
			changeClass(lastRedDiv.id,'showDiv')
		}
		if( nextRedDiv.id === 'codeContentNested25' )	
		{	
			alert("code running is over")
			changeClass(nextRedDiv.id,'showDiv')
		}	
	} 
}	