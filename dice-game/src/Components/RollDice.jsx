import React, { useState } from "react";
import styled from "styled-components";

const RollDice = ({ roleDice, currentdice }) => {
  
  return (
    <DiceContainer>
      <div className="dice" onClick={roleDice}>
        <img src={`/images/dice/dice_${currentdice}.png`} alt="dice" />
      </div>
      <p>Click On Dice to roll</p>
    </DiceContainer>
  );
};

export default RollDice;

const DiceContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;

  .dice {
    cursor: pointer;
  }
`;
