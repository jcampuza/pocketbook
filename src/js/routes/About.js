import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  position: relative;
  flex: 1 0 92%;
  display: block;
  height: 500px;
  padding: 1rem;
  font-size: 14px;
  color: #333;

  > * + * {
    margin-bottom: 1rem;
  }
`;

const PocketbookBrand = styled.span`
  color: #f14d4d;
  text-shadow: 1px;
`;

export const About = () => {
  return (
    <AboutContainer>
      <h2>
        Welcome to <PocketbookBrand>Pocketbook!</PocketbookBrand>
      </h2>
      <p>
        Pocketbook was created out of frustration with a common problem,
        automation. As a frontend developer, many times I would write small to
        medium sized scripts in the console to do a multitude of things. An
        example would be automating some flows in an application so you can skip
        the clicking around and immediately jump to where you want to be
        working.
      </p>

      <p>
        In some cases sharing these scripts would also be useful, but then those
        who are not developers would have to go through the trouble of learning
        the console, and storing the scripts I'd send them somewhere. That's why
        pocketbook was born, to quickly store or even write scripts in the
        browser and just execute them on the main page at the press of a button!
      </p>

      <p>It's simple, just follow the following steps:</p>
      <ul>
        <li>Click to add a script, some defaults will be filled in for you</li>
        <li>
          Give your script a title, and description, and fill in the editor with
          whatever code you want to run
        </li>
        <li>
          Click save, and click run! Your scripts will be saved for you on
          localStorage for you to access at any time
        </li>
      </ul>

      <p>
        There are some other things built in like changing the editor theme,
        importing/exporting scripts to send to friends, and maybe more in the
        future. Make sure to poke around to see all there is to offer.
      </p>
    </AboutContainer>
  );
};
