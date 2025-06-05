# food-order
Food Order Web App from Udemy course: React - The Complete Guide 2025 (incl. Next.js, Redux), Section 19.

Your Task: Build a "Food Order" web app

**Requirements**:
1. Add components for displaying **products**, the **cart** (in a **modal**) and a **checkout form** (also in a **modal**).
2. **Fetch** the (dummy) meals data from **backend** & show it on screen (GET / meals).
3. Allow users to **add & remove** products to / from the **cart**.
4. **Send cart data** along with **user data** (full name, email, street, postal code, city) to the **backend** (POST / orders).
5. Handle **loading & error** states.
6. Use **State & Context**.

**My implementation:**

1. Home page. Header that containt logo, "Orders" button (with number of Orders) and "Cart" button (with number of meals in Cart). <br/>
Displays available meals that are fetched from backend. We can add a meal to the cart by clicking the button "Add to cart". <br/>
Multiple additions of the same meal adds it multiple times in the Cart.<p/>
![image](https://github.com/user-attachments/assets/9b28a696-9d8b-4eb5-8632-fae5c80871b3)
2. When adding some meals to the Cart, meals counter in Cart button updates. Cart modal displays the selected meals with their prices and quantity. <br/>
We can add more or less of a meal with the "+", "-" buttons around the quantity. Total price is also displayed. <br/>
Cart buttons are: 
    - "Clear order" updates the modal to clear error question 
    - "Cancel" goes back to home page
    - "Go to Checkout" updates modal to "Checkout Form"
  
    Meals are stored in the temprorary browser data. Pressing "Cancel" in "Cart" modal does not delete the order. By re-opening the "Cart", the order meals stay in the "Cart".<p/>
![image](https://github.com/user-attachments/assets/b9fe9a66-fadf-4a48-92cd-9a2a1e721485)
3. When we press the "Clear order" button a question appears for delete confirmation. <br/>
Pressing "Yes" deletes the meals from the temprorary browser data. Pressing "No" returns to "Cart". <p/>
![image](https://github.com/user-attachments/assets/acc3c549-9098-4776-880a-a95f5c51dec9)
4. When we press the "Go to Checkout" button, we go to the "Checkout Form" where the user puts the user data in the input fields. <br/>
"Cancel" button goes back to "Cart" and "Submit Order" submits the order to the backend. <p/>
![image](https://github.com/user-attachments/assets/47764c09-fc7d-40a5-98a9-f8fff5cd4cdd)
5. If an error occurs, error message is displayed in the modal: <p/>
![image](https://github.com/user-attachments/assets/29b8035a-138d-4dc0-81eb-501c9e45a65b)
6. If there are no errors, order is submitted:<p/>
![image](https://github.com/user-attachments/assets/dd6608b3-79ef-4ca1-aed0-92e001cc70c8)
7. "Order" button updates its counter. <br/>
When we click at the "Orders" buttons all the orders are displayed. <br/>
At the top we can see the user data and below that we can see the meals that are contained in the order.<br/>
When there are many meals, the meals table becomes scrollable on purpose (for practice). <br/>
Orders buttons are:
    - "Delete Order" deletes the order
    - We can navigate between orders with "<" and ">" buttons. User data and meals get updated.
    - "Cancel" button goes back to Home page
    <p/>
![image](https://github.com/user-attachments/assets/1d1404f4-d8e4-4fbd-8205-09c84f46d5e6)
