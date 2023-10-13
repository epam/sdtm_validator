import { useState } from 'react';

import { ErrorType, IPC_CONNECTOR_NAME } from '@common';
import { ErrorModal, ViewReportSection } from '@components';
import { ReportDetailsType } from '@types';
import { getError, getFormattedReportDetails } from '@utils';

export const ViewReportSectionConnector = () => {
  const [reportDetails, setReportDetails] = useState<ReportDetailsType | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();

  const showErrorModal = (error: ErrorType) => {
    setError(error);
    setOpenErrorModal(true);
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const saveAndOpenReport = (reportId: string) => async () => {
    try {
      setSaving(true);

      await window[IPC_CONNECTOR_NAME].saveAndOpenReport(reportId);
    } catch (e) {
      showErrorModal(getError(e));
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 200);
    }
  };

  const getReportDetails = async (reportId: string): Promise<void> => {
    try {
      setLoading(true);

      const rawReportDetails = await window[IPC_CONNECTOR_NAME].getReportDetails(reportId);
      const formattedReportDetails = getFormattedReportDetails(rawReportDetails);

      setReportDetails(formattedReportDetails);
    } catch {
      setReportDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ViewReportSection
        getReportDetails={getReportDetails}
        isLoading={isLoading}
        isSaving={isSaving}
        reportDetails={reportDetails}
        saveAndOpenReport={saveAndOpenReport}
      />
      <ErrorModal error={error} handleClose={closeErrorModal} open={openErrorModal} />
    </>
  );
};
