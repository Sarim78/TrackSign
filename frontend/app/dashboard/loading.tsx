/**
 * DashboardLoading — spinner shown while a dashboard child route is loading.
 *
 * Route: /dashboard/*
 */

const DashboardLoading = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full"
        style={{ border: "2px solid #E8614D", borderTopColor: "transparent" }}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
};

export default DashboardLoading;
