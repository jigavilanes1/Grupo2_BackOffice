import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-error-modal-content",
  template: `
    <div class="modal-content success-modal">
      <div class="modal-header">
        <h4 class="modal-title">Error</h4>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .success-modal {
        background-color: #f2dede;
        width: auto;
        font-size: 16px;
      }
    `,
  ],
})
export class ErrorModalContentComponent implements OnInit {
  @Input() message: string = "";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.activeModal.close();
    }, 2000);
  }
}
