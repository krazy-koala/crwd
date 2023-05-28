import { useState } from 'react';

import Checkbox from './Checkbox.react';
import Table from './Table.react';
import Modal from './Modal.react';
import Button from './Button.react';

import capitalizeFirstLetter from '../util/capitalizeFirstLetter';

import './DevicesTable.react.css';

function DevicesTable({ data }) {
  const [selected, setSelected] = useState(new Set());
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      key: 'checkbox',
      title: '',
      render: (_, item) => (
        <Checkbox
          checked={selected.has(item.name)}
          onChange={() => {
            const newSelected = new Set(selected);
            if (selected.has(item.name)) {
              newSelected.delete(item.name);
            } else {
              newSelected.add(item.name);
            }
            setSelected(newSelected);
          }}
        />
      ),
    },
    { key: 'name', title: 'Name' },
    { key: 'device', title: 'Device' },
    { key: 'path', title: 'Path' },
    {
      key: 'status-icon',
      title: '',
      render: (_, item) => (
        <DeviceStatusIcon status={item.status} />
      ),
      cellStyle: { textAlign: 'right' },
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, item) => (
        <DeviceStatusLabel status={item.status} />
      )
    },
  ];

  return (
    <div className="devices-table">
      <SelectedDevicesModal
        data={data}
        selected={selected}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <DevicesTableHeader
        data={data}
        selected={selected}
        onSelectAll={(e) => {
          if (e.target.checked) {
            setSelected(new Set(data.map(item => item.name)))
          } else {
            setSelected(new Set());
          }
        }}
        onDownloadSelected={() => {
          setShowModal(true);
        }}
      />
      <Table
        data={data}
        columns={columns}
        highlightOnHover={true}
        toggleRowHighlight={(item) => selected.has(item.name)}
      />
    </div>
  );
}

function SelectedDevicesModal(props) {
  const {
    data,
    selected,
    showModal,
    setShowModal
  } = props;

  const columns = [
    { key: 'device', title: 'Device' },
    { key: 'path', title: 'Path' },
  ];

  return (
    <Modal
      isVisible={showModal}
      onConfirm={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
      title="Download Selected"
    >
      <Table
        data={data.filter(item => selected.has(item.name))}
        columns={columns}
      />
    </Modal>
  );
}

function DevicesTableHeader({ data, selected, onSelectAll, onDownloadSelected }) {
  return (
    <div className="devices-table-header">
      <Checkbox
        checked={selected.size === data.length}
        indeterminate={selected.size > 0 && selected.size !== data.length}
        onChange={onSelectAll}
      />
      <SelectedDevicesLabel selected={selected} />
      <DownloadSelectedButton
        data={data}
        selected={selected}
        onDownloadSelected={onDownloadSelected}
      />
    </div>
  )
}

function SelectedDevicesLabel({ selected }) {
  const label = selected.size > 0
    ? `Selected ${selected.size}`
    : 'None Selected'
  return <span className="devices-table-selected-label">{label}</span>;
}

function DownloadSelectedButton({ data, selected, onDownloadSelected }) {
  const canDownload = selected.size > 0 && data
    .filter(item => selected.has(item.name))
    .every(item => item.status === 'available');
  return canDownload && (
    <Button
      type="light"
      className="devices-table-download-button"
      onClick={onDownloadSelected}
    >
      Download Selected
    </Button>
  );
}

function DeviceStatusIcon({ status }) {
  return (
    status === 'available' && (
      <span className="device-status-icon-container">
        <span className="device-status-icon device-status-icon-available"></span>
      </span>
    )
  )
}

function DeviceStatusLabel({ status }) {
  return <span>{capitalizeFirstLetter(status)}</span>;
}

export default DevicesTable;