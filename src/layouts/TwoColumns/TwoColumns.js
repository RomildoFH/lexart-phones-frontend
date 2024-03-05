import React from 'react'

const TwoColumns = ({column1,column2}) => {
  return (
    <section className={`flex w-screen h-screen bg-white`}>
      <section className={`flex w-1/5 min-w-60 h-screen`}>
        {column1}
      </section>
      <section className={`flex w-4/5 h-screen`}>
        {column2}
      </section>
    </section>
  );
};

export default TwoColumns;
