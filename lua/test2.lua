local pair = true
(function() 
	local _laux__match_statement_value = pair
	assert(type(_laux__match_statement_value) == "table", "Conditional members require a table as input value")	local _, x = next(_laux__match_statement_value)
	local _, y = next(_laux__match_statement_value, 1)
	if (x == y) then
		return print("These are twins")
	end
	local _, x = next(_laux__match_statement_value)
	local _, y = next(_laux__match_statement_value, 1)
	if (x + y == 0) then
		return print("Antimatter, kaboom!")
	end
	return print("No correlation...")
end)()





local function tellMeAbout(number)
  return (function() 
  	local _laux__match_statement_value = number
  	if (_laux__match_statement_value == 7 or _laux__match_statement_value == 4 or _laux__match_statement_value == 5 or _laux__match_statement_value == 2) then
  		return 11 => print("This is a prime")
  	end
  	return print("Ain't special")
  end)()
end
