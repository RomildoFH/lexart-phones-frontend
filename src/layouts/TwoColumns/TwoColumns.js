import React from 'react'

const TwoColumns = ({column1,column2}) => {
  return (
    <section className={`flex first-line:w-screen h-screen bg-white`}>
      <section className={`flex w-1/5 min-w-60 h-screen md:hidden`}>
        {column1}
      </section>
      <section className={`flex w-4/5 h-screen md:w-full md:flex-col`}>
        <section className={`hidden h-28 w-full md:flex`}>
        {column1}
        </section>
        {column2}
      </section>
    </section>
  );
};

export default TwoColumns;
