const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-600 bg-red-200 font-medium text-center py-2 px-4 rounded">
      {message}
    </div>
  );
};

export default ErrorMessage;
