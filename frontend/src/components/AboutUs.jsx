export default function AboutSection() {
  return (
    <div className="w-full overflow-hidden px-4 md:px-8 mt-[20px]">
      <div className="bg-[#6A0DFF] rounded-[60px] w-full max-w-screen-xl mx-auto px-6 md:px-20 py-8 text-center text-white">
        {/* Label */}
        <div className="uppercase text-sm tracking-wide font-medium flex items-center justify-center gap-2 mb-6">
          <span>
            <i className="fas fa-lightbulb text-white text-3xl mr-2"></i>
          </span>{" "}
          <span className="text-lg">About Us</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-3xl font Righteous leading-tight mb-4 tracking-wider">
          Where Learning Meets <br className="hidden md:block" />
          Intelligence and Simplicity
        </h2>

        {/* Subheading */}
        <p className="text-base md:text-sm text-white/90 font-light max-w-2xl mx-auto Roboto tracking-wide">
          Quizoma is more than just a quiz site — it's a smart learning
          experience that lets you test knowledge, ask questions, and explore
          topics in an intuitive, AI-powered.
        </p>
      </div>
    </div>
  );
}
