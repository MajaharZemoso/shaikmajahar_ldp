# Problem Statement

"""John is a recruiter in a company and wants to map candidates based on their location preferences. 
Develop an algorithm to match candidates to the locations based on their preferences."""

# Understandings from the question

"""We need to map candidates to the locations based on their preferences and their location preferences
For these i can use hash functions where the key is the location and the value is the candidates who prefer it"""

# Algorithm will follow like below

"""
    1. Take the location preference from each candidate
    2. For each candidate data 
        - For all the preferred locations
            - If the location matches to any of the available locations
                - Then map the name of the candidate to the location
    3. Step 2 will continue for all the candidates data
    4. It returns the data where the candidates are matched to their preferred locations


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

def hasingPreferenceLocations(locations,candidates):

    # initializing the empty dictionary for mapping
    mappedLocations = {i:[] for i in locations}

    # Iterating through each candidate data and mapping their location
    for name,preference in candidates.items():

        # as one candidate may have multiple locations preference
        for subPreference in preference:

            if subPreference in locations: # checking the location preference is their in our location list or not

                mappedLocations[subPreference].append(name)
    
    # returning the mapped locations
    return mappedLocations

# Driver Code

# Taking the count of candidates from the user
countOfCandidates=int(input("Enter count of candidates  "))

# List of locations available
print(*locations)

# List to store the candidates data
candidates = {}

# Iterating for collecting the candidates data
for i in range(countOfCandidates):


    # Collecting the candidates data
    candidatesData = list(input("Enter candidates data like name along with preferences ").split(" "))
    candidates[candidatesData[0]] = list(candidatesData[1:])

# Calling the function
mappedData=hasingPreferenceLocations(locations,candidates)

# display the results
for location,listOfCandidates in mappedData.items():
    if len(listOfCandidates)!=0:
        print(location,"---",listOfCandidates)





# Time Complexity
# Iterating through each candidate - O(n)
# Checking if the location preference is in the list of locations - O(m)
# Appending the candidate name to the list of mapped candidates for the location - O(1)

# Total time complexity will be O(n^2)


# Space Complexity
"""
The size of the dictionary can be at most m, and for each key in the dictionary, 
the maximum size of the value list can be n. 
Therefore, the space complexity of the program is O(n * m).

"""




# Data for Testing
"""
Majahar Delhi Hyderabad Telangana
Harish Tripura Delhi Chennai
Seenu Bangalore Chennai
Teja Hyderabad Pune
Bhanu Chennai

"""

# Output
"""
Bangalore --- ['Seenu']
Chennai --- ['Harish', 'Seenu', 'Bhanu']
Delhi --- ['Majahar', 'Harish']
Hyderabad --- ['Majahar', 'Teja']
Pune --- ['Teja']
Telangana --- ['Majahar']
Tripura --- ['Harish']

"""
