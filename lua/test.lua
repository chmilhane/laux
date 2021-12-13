local pair = {
  2,
  -2
}
(function() 
	local _laux__match_statement_value = pair
	local _, x = next(_laux__match_statement_value)
	local _, y = next(_laux__match_statement_value, 1)
	if (x == y) then
		print("These are twins")
	end
	local _, x = next(_laux__match_statement_value)
	local _, y = next(_laux__match_statement_value, 1)
	if (x + y == 0) then
		print("Antimatter, kaboom!")
	end
	return print("No correlation...")
end)()
