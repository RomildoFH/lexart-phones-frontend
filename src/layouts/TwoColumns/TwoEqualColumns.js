import React from 'react'

const TwoEqualColumns = ({column1,column2}) => {
  return (
    <section className={`flex first-line:w-screen h-screen max-h-full bg-white`}>
      <section className={`flex w-1/2 min-w-60 h-screen md:hidden`}>
        {column1}
      </section>
      <section className={`flex flex-col justify-center w-1/2 h-screen md:w-full md:flex-col max-h-full`}>
        {column2}
      </section>
    </section>
  );
};

export default TwoEqualColumns;
