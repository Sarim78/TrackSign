/**
 * Loading — full-page spinner shown while the app route is loading.
 */

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#171412" }}>
      <div
        className="h-8 w-8 animate-spin rounded-full"
        style={{ border: "2px solid #E8614D", borderTopColor: "transparent" }}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
};

export default Loading;
