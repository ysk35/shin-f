import React from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Card } from '@mui/material';

function UserSettingsPage() {
  // react-hook-form の設定
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // フォームの送信処理
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  // アカウント削除処理
  const handleDelete = () => {
    console.log('Account deletion triggered');
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff' }}>
      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={2} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="New" sx={{ color: '#fff' }} />
            <Tab label="Account" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        {/* 左側のユーザー編集フォーム */}
        <Card sx={{ width: '500px', p: 3, border: '2px solid #7F00FF', borderRadius: '10px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              fullWidth
              label="Password confirmation"
              type="password"
              variant="outlined"
              margin="normal"
              {...register('passwordConfirmation', { required: 'Please confirm your password', validate: value => value === watch('password') || 'Passwords do not match' })}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#7F00FF', color: '#fff' }}>
              SAVE CHANGES
            </Button>
          </form>
        </Card>

        {/* 右側のアカウント削除ボタン */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 4 }}>
          <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
            Do you delete the account?
          </Typography>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            DELETE
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default UserSettingsPage;
