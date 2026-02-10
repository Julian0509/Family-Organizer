1. Instructions for Executing / Viewing the Application
Requirements: VSCode, Node, Git

1.1 Clone git Repository
Clone git repository into VSCode with the following command:
git clone https://github.com/Julian0509/Family-Organizer.git

1.2 Setup Backend:
New Terminal
cd backend
npm install
node index
The backend starts on http://localhost:3002

1.3 Setup Frontend:
New Terminal
cd Frontend
npm install
npm run dev
The React app runs on http://localhost:5173

2 How to use the application/Functionality:
Open http://localhost:5173 in browser.

1. You can either login with the pre-defined family:
For admin rights:

Username Julian
Password Admin
FamilyId Schmitt

Normal Member:

Username Emma
Password Pa$$w0rd
FamilyId Schmitt

or Register a new Family member or Family by clicking on Register.

2. After logging in, the calendar tab opens. The window at the top left shows a typical calendar and
indicates events on a given day with a dot. When you click on such a day, the window to the right
shows the respective events. On the map below, you can see the locations of the events entered
and also display the respective names by clicking on a marker

3. At the top of the navigation bar, clicking on “events” lists all future events for the family. For each
event, it shows the name, date, time, location, required items, and the user who created it. Without
admin rights, you can only edit events that you have created yourself. The admin can edit all events.
It is also possible to delete your event or add it to the map with its longitude and latitude coordinates.
The “Add Events” button allows you to add an event by entering the name, location, date, start time,
end time, and required items.
The search bar allows you to search by event name, date, location, or required items.

4. The logout button allows you to log out and return to the login start page.
   
5. If you have admin rights, there is a “Manage User” button next to the logout button. This lists all
users in this family and allows you to remove them or edit their name or role.
