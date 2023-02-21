# Problem Statement

"""John is a recruiter in a company and wants to map candidates based on their location preferences. 
Develop an algorithm to match candidates to the locations based on their preferences."""

# Understandings from the question

"""We need to map candidates to the locations based on their preferences and their location preferences
For these i can use hash functions where the key is the location and the value is the candidates who prefer it"""

# Algorithm will follow like below

"""
    1. Take the location preference from each candidate
    2. For each location i can use a hash function where the key is the location and the value is the candidates who prefer it

    Note: In Python for hasing we use Dictionary
            so in my code I have used a dictionary

"""
# Data Needed

"""In my assumptions i am taking the locations like in the below List"""

locations = [
    "Bangalore",
    "Chennai",
    "Delhi",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    "New Delhi",
    "Pune",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
]

# Solution

def Hasing_preference_locations(locations,candidates):

    # initializing the empty dictionary for mapping
    mapped_locations ={i:[] for i in locations}

    # Iterating through each candidate data and mapping their location
    for name,preference in candidates.items():

        # as one candidate may have multiple locations preference
        for i in preference:

            if i in locations: # checking the location preference is their in our location list or not

                mapped_locations[i].append(name)
    
    # returning the mapped locations
    return mapped_locations

# Driver Code

# Taking the count of candidates from the user
n=int(input("Enter count of candidates  "))

# List of locations available
print(locations)

# List to store the candidates data
candidates = {}

# Iterating for collecting the candidates data
for i in range(n):


    # Collecting the candidates data
    candidates_data = list(input("Enter candidates data like name along with preferences ").split(" "))
    candidates[candidates_data[0]] = list(candidates_data[1:])

# Calling the function
mapped_data=Hasing_preference_locations(locations,candidates)

# display the results
for i,j in mapped_data.items():
    if len(j)!=0:
        print(i,j)




# Data for Testing
"""
Majahar Delhi Mumbai Pune
Hari Kolkata Delhi
Benhur Pune
Seenu Bangalore Pune
Bhanu Chennai Hyderabad Delhi

"""

# Output
"""
Bangalore ['Seenu']
Chennai ['Bhanu']
Delhi ['Majahar', 'Hari', 'Bhanu']
Hyderabad ['Bhanu']
Kolkata ['Hari']
Mumbai ['Majahar']
Pune ['Majahar', 'Benhur', 'Seenu']

"""