import { DocusealForm } from "@docuseal/react";

const page = () => {
  return (
    <div>
      <DocusealForm
        src="https://docuseal.co/d/eLPt2oj3u5UBm8"
        email="jyangoraj+test@gmail.com"
        onComplete={(data) => console.log(data)}
      />
    </div>
  );
};

export default page;
