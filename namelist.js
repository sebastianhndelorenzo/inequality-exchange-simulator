const firstnames = [
    // Female 
    "Olivia", "Amelia", "Isla", "Ava", "Emily", "Mia", "Sophia", "Grace", "Lily", "Freya",
    "Ella", "Evie", "Charlotte", "Poppy", "Evelyn", "Ivy", "Scarlett", "Willow", "Isabelle", "Phoebe",
    "Elsie", "Ruby", "Sophie", "Harper", "Jessica", "Daisy", "Alice", "Sienna", "Matilda", "Florence",
    "Isabella", "Rosie", "Sofia", "Emilia", "Hannah", "Imogen", "Molly", "Jasmine", "Millie", "Bella",
    "Violet", "Lucy", "Aria", "Ellie", "Layla", "Eva", "Luna", "Zara", "Maryam", "Erin",
    "Elizabeth", "Ayla", "Zoe", "Penny", "Maisie", "Lola", "Rose", "Esme", "Amber", "Eliza",
    "Abigail", "Maya", "Penelope", "Emma", "Nancy", "Harriet", "Thea", "Victoria", "Darcie", "Hollie",
    "Maria", "Annabelle", "Sara", "Martha", "Gracie", "Georgia", "Robyn", "Aisha", "Clara", "Heidi",
    "Mila", "Zainab", "Fatima", "Bethany", "Francesca", "Leah", "Katie", "Eden", "Amelie", "Eleanor",
    "Lydia", "Savannah", "Faith", "Holly", "Summer", "Orla", "Lottie", "Megan", "Felicity", "Cara",
    "Darcie", "Skye", "Nicole", "Aoife", "Lara", "Madison", "Mabel", "Jennifer", "Lilly", "Bonnie",
    "Daphne", "Nina", "Lena", "Margot", "Amina", "Anaya", "Beatrice", "Niamh", "Ariana", "Clara",
    "Tara", "Joy", "Julia", "Sasha", "Brianna", "Elena", "Lauren", "Caitlin", "Catherine", "Amy",
    "Sarah", "Juliette", "Gemma", "Janet", "Rachel", "Rebecca", "Chelsea", "Eloise", "Anna", "Belle",
    "Dahlia", "Danielle", "Marie", "Sylvie", "Josephine", "Mira", "Isabel", "Maddison", "Brooke", "Alexandra",
    "Natalie", "Melody", "Clare", "Christina", "Elaine", "Louise", "Fiona", "Brenda", "Andrea", "Joanne",
    
    // Male 
    "Oliver", "George", "Noah", "Arthur", "Harry", "Leo", "Muhammad", "Jack", "Charlie", "Oscar",
    "Jacob", "Henry", "Thomas", "Freddie", "Alfie", "Theo", "William", "Finley", "Isaac", "Lucas",
    "Ethan", "Max", "Alexander", "Archie", "Joseph", "Edward", "Samuel", "Daniel", "Harrison", "Benjamin",
    "Sebastian", "Adam", "Mason", "Elijah", "Teddy", "Logan", "Riley", "Ezra", "James", "Tommy",
    "Lewis", "Reuben", "Louie", "Ollie", "Dylan", "Jaxon", "Elliot", "Jake", "Carter", "Matthew",
    "Ben", "Albert", "David", "Aiden", "Jude", "Frankie", "Luke", "Stanley", "Jayden", "Liam",
    "Caleb", "Ronnie", "Rory", "Connor", "Arlo", "Theodore", "Bobby", "Kai", "Zachary", "Nathan",
    "Ellis", "Michael", "Roman", "Elliott", "Hayden", "Joshua", "Blake", "Callum", "Ryan", "Jenson",
    "Hugo", "Leon", "Harley", "Tyler", "Ralph", "Owen", "Myles", "Gabriel", "Jamie", "Jasper",
    "Levi", "Toby", "Aaron", "Cameron", "Jordan", "Andrew", "Eddie", "Benji", "Sam", "Reggie",
    "Finn", "Zac", "Evan", "Joel", "Hudson", "Sonny", "Seth", "Rayan", "Louis", "Rohan",
    "John", "Ali", "Billy", "Cohen", "Cody", "Robert", "Kyle", "Patrick", "Stephen", "Travis",
    "Bradley", "Jackson", "Peter", "Brodie", "Bruno", "Sean", "Zane", "Kieran", "Saul", "Paul",
    "Dexter", "Maxwell", "Martin", "Mohammed", "Nico", "Noel", "Philip", "Rex", "Rhys", "Richard",
    "Ricky", "Sidney", "Simon", "Spencer", "Timothy", "Tony", "Victor", "Vincent", "Walter", "Warren",
    "Wesley", "Wilfred", "Wyatt", "Xander", "Xavier", "Yusuf", "Zack", "Zeke", "Austin", "Barney",
    "Bernard", "Blake", "Carl", "Curtis", "Damien", "Dennis", "Derek", "Donald", "Edmund"
];

const lastnames = [
    "Smith", "Patel", "Khan", "Jones", "Taylor", "Chen", "Brown", "Singh", "Williams", "Ahmed",
    "Evans", "Ali", "Wilson", "Thomas", "Roberts", "Wong", "Johnson", "Sharma", "Walker", "Wright",
    "Robinson", "Wood", "Thompson", "White", "Watson", "Begum", "Jackson", "Green", "Harris", "Kaur",
    "Cooper", "King", "Lee", "Martin", "Clarke", "James", "Morgan", "Hughes", "Edwards", "Mohammed",
    "Hill", "Moore", "Clark", "Harrison", "Scott", "Young", "Morris", "Hall", "Ward", "Turner",
    "Liu", "Carter", "Phillips", "Mitchell", "Campbell", "Anderson", "Allen", "Chowdhury", "Adams", "Baxter",
    "Baker", "Abbott", "Davis", "Chapman", "Rodriguez", "Murphy", "Kelly", "Maxwell", "Hussain", "Gray",
    "Simpson", "Graham", "Parker", "Hunt", "Black", "Sullivan", "Lloyd", "Richards", "Cox", "Mills",
    "O'Connor", "Knight", "Lee", "Johnston", "Webb", "Lawson", "Reid", "Harvey", "Kim", "Ellis",
    "Long", "Price", "Grant", "Russell", "Foster", "Harper", "Barrett", "Wells", "West", "Cole",
    "Byrne", "Stewart", "Naidu", "Bailey", "Bell", "Davies", "Jenkins", "Riley", "Gardner", "Payne",
    "Pearce", "North", "Shaw", "Day", "Holmes", "Rogers", "Stevens", "Marshall", "Rose", "Ford",
    "McDonald", "Brooks", "Watts", "Bennett", "Webster", "Wallace", "Reynolds", "Berry", "Collins", "Desai",
    "Fletcher", "Flynn", "Hawkins", "Perry", "Hudson", "Moss", "MacDonald", "Oliver", "Kennedy", "Gill",
    "Dixon", "Palmer", "Sands", "Stokes", "Doyle", "Bradley", "Lane", "Andrews", "Page", "Ray",
    "Osborne", "Newton", "Ryan", "Peters", "Mason", "Poole", "Blake", "Curtis", "Burton", "Glover",
    "Hart", "Fields", "Stone", "Bishop", "Nash", "Cross", "Knight", "Butler", "Lambert", "Power",
    "Bates", "Buckley", "Hayes", "Stephens", "Miles", "Nixon", "Hayward", "Spencer", "Morton", "Hodges",
    "Shepherd", "Heath", "Curry", "Goodwin", "Burns", "Barker", "Dickinson", "Ball", "Finch", "Snow",
    "Hampton", "Booth", "Parsons", "Hardy", "Lowe", "Middleton", "Frost", "Blake", "Boyd", "Clements",
    "Whitehead", "Pitt", "Lyons", "Banks", "Owen", "Rush", "Norris", "Holland", "Boyle", "Fisher",
    "Vaughn", "Hogan", "Farrell", "Bradshaw", "Parry", "Faulkner", "Baldwin", "Burrows", "Holt", "Lamb",
    "Preston", "Duffy", "Sweeney", "Todd", "Wolfe", "Bridges", "Bush", "Hicks", "Humphreys", "Fraser",
    "Riggs", "Gates", "Sharpe", "Hutchinson", "Gilbert", "Dean", "Norman", "Barber", "Hooper", "Sidhu"
];
