import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #18181b;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

export const AddToWatchListButton = styled.TouchableOpacity`
  top: 230;
  left: 320;
  position: absolute;
  width: 17%;
  background-color: #fb5b5a;
  border-radius: 64;
  height: 70;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  z-index: 1;
`;

export const Header = styled.Text`
  font-size: 26;
  font-weight: bold;
  margin-top: 20px;
  color: #d1d1d1;
  margin-left: 10;
`;

export const MovieTitle = styled.Text`
  font-size: 15;
  color: #d1d1d1;
  text-align: center;
  margin-bottom: 7;
`;

export const GenreText = styled.Text`
  margin-top: 5;
  margin-left: 20;
`;
