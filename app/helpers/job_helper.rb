# frozen_string_literal: true

# View helper for jobs
module JobHelper
  def job_statuses
    Job.statuses.keys.map { |k| [job_status(k), k] }
  end

  def job_status(key)
    t("models.job.status.#{key}")
  end

  def job_title(status = nil)
    content = [Job.model_name.human, job_tag(status)]
    content_tag(:h1, safe_join(content), class: 'title is-1')
  end

  def job_tag(status, size: 'medium', pos: 'is-pulled-right')
    return if status.nil?
    cls = "tag #{job_status_class(status)} is-#{size} #{pos}"
    content_tag(:span, job_status(status), class: cls)
  end

  def job_status_class(status)
    case status
    when 'not_started'
      'is-warning'
    when 'started'
      'is-info'
    when 'completed'
      'is-success'
    end
  end
end
