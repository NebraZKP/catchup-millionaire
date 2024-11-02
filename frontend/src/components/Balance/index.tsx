import { Card, Typography, Box } from '@mui/material';

interface BalanceProps {
  currentBalance: number;
  claimableAmount: number;
}

const Balance: React.FC<BalanceProps> = ({ currentBalance, claimableAmount }) => {
  return (
    <Card sx={{ p: 3, minWidth: 275 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Current Balance
          </Typography>
          <Typography variant="h4">
            ${currentBalance.toLocaleString()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Available to Claim
          </Typography>
          <Typography variant="h4" color="primary">
            ${claimableAmount.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export { Balance };
