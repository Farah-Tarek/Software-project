import axios from 'axios';

const getUserTickets = async (userid) => {
 try {
    const response = await axios.get(`/user-tickets/${userid}`);
    console.log(response.data);
 } catch (error) {
    console.error('Error fetching user tickets:', error);
 }
};

getUserTickets(1); // Replace 1 with the actual user ID