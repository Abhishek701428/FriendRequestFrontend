import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUsersAndFriends = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://friendrequestassigbackend.onrender.com/api/users', { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data.users);
        setFriends(res.data.friends);
        setFriendRequests(res.data.friendRequests);
      } catch (error) {
        console.error('Error fetching users and friends:', error.response?.data || error.message);
      }
    };
    fetchUsersAndFriends();
  }, []);

  const addFriend = async (targetUserId) => {
    const token = localStorage.getItem('token');
    if (!token || !targetUserId) {
      console.error('Token or Target User ID is missing');
      return;
    }

    try {
      const response = await axios.post(
        `https://friendrequestassigbackend.onrender.com/api/friends/${targetUserId}`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Error sending friend request:', error.response?.data || error.message);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`https://friendrequestassigbackend.onrender.com/api/friends/accept/${requestId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert('Friend request accepted!');
      setFriendRequests(friendRequests.filter(request => request._id !== requestId));
    } catch (err) {
      console.error('Error accepting friend request:', err.response?.data || err.message);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`https://friendrequestassigbackend.onrender.com/api/friends/reject/${requestId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert('Friend request rejected!');
      setFriendRequests(friendRequests.filter(request => request._id !== requestId));
    } catch (err) {
      console.error('Error rejecting friend request:', err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container>
      {/* Logout Button */}
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>

      {/* Friends List */}
      <Typography variant="h4" gutterBottom>Friends</Typography>
      <List>
        {friends.map((friend) => (
          <ListItem key={friend._id}>
            <ListItemAvatar>
              <Avatar>{friend.username.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} />
          </ListItem>
        ))}
      </List>

      {/* Users List */}
      <Typography variant="h4" gutterBottom>Users</Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.username}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<PersonAddIcon />}
                  onClick={() => {
                    addFriend(user._id);
                  }}
                >
                  Add Friend
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Friend Requests */}
      <Typography variant="h4" gutterBottom>Friend Requests</Typography>
      <List>
        {friendRequests.map((request) => (
          <ListItem key={request._id}>
            <ListItemAvatar>
              <Avatar>{request.username.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={request.username} />
            <IconButton
              edge="end"
              color="primary"
              onClick={() => acceptFriendRequest(request._id)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="secondary"
              onClick={() => rejectFriendRequest(request._id)}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default HomePage;
