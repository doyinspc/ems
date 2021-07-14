def user_locations(user_location_id, location_list):
    #if no id passed 
    #if location id already in list 
    #stop recursion and return list
    if user_location_id == None or user_location_id in location_list:
        return location_list:
    #get location data from db using id passed
    #as argurment
    #not sure how u call data from db
    location_data = LOCATIONS(parent_id=user_location_id)
    for sub_location in location_data:
       return user_locations(sub_locations.parent_id, location_list)