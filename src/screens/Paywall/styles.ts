import { ThemedText } from '#/theme/components/Text';
import { ThemedTitle } from '#/theme/components/Title';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled(ThemedTitle)`
  text-align: center;
  font-size: 42px;
  margin-top: 45px;
  line-height: 54px;
`;

export const Benefits = styled.View`
  margin-vertical: 28px;
`;

export const Benefit = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BenefitIconWrapper = styled.View`
  width: 48px;
  height: 48px;

  align-items: center;
  justify-content: center;

  border-radius: 8px;
`;

export const BenefitText = styled(ThemedText)`
  flex-shrink: 1;
  font-size: 16px;

  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin-vertical: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export const ButtonWrapper = styled.View`
  margin-top: auto;
  margin-bottom: 20px;
`;

export const SubscriptionText = styled(ThemedText)`
  margin-top: auto;

  text-align: center;
  font-size: 26px;
`;

export const Price = styled(ThemedText)`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.kanit.extraLight};
`;

export const SubscriptionFrequencyText = styled(ThemedText)`
  text-align: center;
  font-size: 17px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};

  color: ${({ theme }) => theme.colors.placeholder};
`;

export const Protection = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`;

export const ProtectionIconWrapper = styled.View`
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  margin-right: 8px;
`;

export const ProtectionText = styled(ThemedText)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};

  color: ${({ theme }) => theme.colors.placeholder};
`;

export const UserRights = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
`;

export const Right = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacement.horizontal}px;
`;

export const RightText = styled(ThemedText)`
  font-family: ${({ theme }) => theme.fonts.kanit.light};

  color: ${({ theme }) => theme.colors.placeholder};
`;

export const RightSeparator = styled(ThemedText)`
  flex: 1;

  text-align: center;
  font-family: ${({ theme }) => theme.fonts.kanit.light};

  color: ${({ theme }) => theme.colors.placeholder};
`;
