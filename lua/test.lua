local number = 13
(function()
	local _laux__match_statement_value = number
	if (_laux__match_statement_value == 1) then
    local str = "One!"
    print(str)

    return
	end
	if (_laux__match_statement_value == 11 or _laux__match_statement_value == 7 or _laux__match_statement_value == 5 or _laux__match_statement_value == 3 or _laux__match_statement_value == 2) then
		return print("This is a prime")
	end
	for _laux__match_statement_loop_value = 13, 19 do
		if (_laux__match_statement_loop_value == _laux__match_statement_value) then
			return print("A teen")
		end
	end
	return print("Ain't special")
end)()





local pair = true
(function()
	local _laux__match_statement_value = pair
	local _, x = next(_laux__match_statement_value)
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
