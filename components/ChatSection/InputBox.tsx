import { SendHorizontal, Sparkle } from "lucide-react";

interface InputBoxProps {
  isLoading: boolean;
  input: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  isLoading,
  input,
  handleSubmit,
  handleInputChange,
}: any) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-lowlight dark:bg-primary flex rounded-md pl-6 pr-2 py-2 mt-4"
    >
      <input
        placeholder="Ask here..."
        className="w-full bg-transparent outline-none resize-none pr-2 text-secondary dark:text-lowlight"
        autoFocus
        value={input}
        onChange={handleInputChange}
      />
      {!isLoading ? (
        <button
          type="submit"
          className="grid place-items-center bg-light dark:bg-secondary text-secondary dark:text-light w-10 h-10 rounded-md"
        >
          <SendHorizontal
            className={isLoading ? "animate-pulse" : ""}
            size={20}
          />
        </button>
      ) : (
        <button
          type="button"
          className="grid place-items-center bg-secondary text-white w-10 h-10 rounded-md"
        >
          <Sparkle size={24} className="animate-spin" />
        </button>
      )}
    </form>
  );
};

export default InputBox;
