# **App Name**: Skyfall Boomer

## Core Features:

- Ball Generation: Generate white balls that fall from the top of the screen at a consistent rate.
- Click and Boom: Implement touch/click detection on each ball to trigger an explosion effect. This effect will emanate outward from the center of the ball in 8 directions.
- Score Tracking: Increment the user's score by 1 each time a ball is successfully clicked.
- Ball Expiration: Handle ball expiration upon reaching the bottom of the screen; explosion occurs, and decrement of 'big balls' happens every 5 expirations, leading to game over if 'big balls' hit zero. There are 3 big balls, each one explodes when 5 ball touch the end, and they are recuperated when 50 balls are exploded by the user.
- Game Over Condition: Detect game over when three balls are exploded by touching the end of the screen.
- Score-Based Ball Color: Implement score-based color changes for the falling balls at 30, 60, 90, etc., with a rainbow gradient at scores over 500.
- Bonus Ball Animation: Upon exploding 50 balls, play an animation that adds a large ball near the others (big balls).

## Style Guidelines:

- Primary color: Vivid blue (#4285F4), for a playful and engaging feel.
- Background color: Light blue (#E3F2FD), a desaturated version of the primary color, to create a bright and airy atmosphere.
- Accent color: Bright orange (#FF9800), for highlighting interactive elements.
- Font: 'Poppins' (sans-serif) for a geometric, contemporary look.
- Display game score prominently at the top of the screen.
- Implement particle effects when a ball explodes upon touch.
- Use a circular icon style.