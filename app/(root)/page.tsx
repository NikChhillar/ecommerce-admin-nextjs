"use client";

import { Modal } from "@/components/ui/modal";

// import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className="p-4">
      {/* <UserButton afterSignOutUrl="/" /> */}
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="modal title"
        description="desc"
      >
        Children
      </Modal>
    </div>
  );
};

export default SetupPage;
